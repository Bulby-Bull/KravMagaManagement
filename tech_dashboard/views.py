from django.shortcuts import render

from core.models import Technique
from collections import defaultdict


def tech_dash_main(request):
    krav_techs = Technique.objects.all().order_by(
        'belt_prog', 'uv', 'category', 'sub_category'
    )

    # Build nested dict
    tree = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: defaultdict(list))))

    for t in krav_techs:
        tree[t.belt_prog][t.uv][t.category][t.sub_category].append(t)

    # Convert nested defaultdicts to regular dicts
    def convert_dict(d):
        if isinstance(d, defaultdict):
            d = {k: convert_dict(v) for k, v in d.items()}
        return d

    context = {
        'tree': convert_dict(tree)
    }

    return render(request, 'tech_dashboard/tech_dash_main.html', context)