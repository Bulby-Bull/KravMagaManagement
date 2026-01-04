from django.core.management.base import BaseCommand
import csv
from core.models import Technique
from datetime import datetime

def parse_date_safe(date_str):
    """Return a date object or None if empty/invalid"""
    if not date_str or str(date_str).strip() == '':
        return None
    try:
        return datetime.strptime(date_str, '%d-%m-%y').date()
    except ValueError:
        return None  # or log warning

def parse_int_safe(value):
    """Return int or None if empty/invalid"""
    if not value or str(value).strip() == '':
        return None
    try:
        return int(value)
    except ValueError:
        return None  # or log warning

class Command(BaseCommand):
    help = "Import techniques from CSV"

    def handle(self, *args, **kwargs):
        with open('data/techniques.csv', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f, delimiter=';')
            for row in reader:
                print(reader.fieldnames)
                Technique.objects.create(
                    viewed_technique=row['viewed_technique'],
                    belt_prog=row['belt_prog'],
                    uv=row['uv'],
                    category=row['category'],
                    sub_category=row['sub_category'],
                    position=row['position'],
                    technique=row['technique'],
                    viewed_date=parse_date_safe(row.get('viewed_date', '')),
                    revision_date=parse_date_safe(row.get('revision_date', '')),
                    note=row['note'],
                    official_book_ref_page=parse_int_safe(row.get('official_book_ref_page', '')),
                    official_prog_ref_2025=row['official_prog_ref_2025'],
                )
