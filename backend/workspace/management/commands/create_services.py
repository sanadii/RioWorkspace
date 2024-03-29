from django.core.management.base import BaseCommand
from workspace.models.services import ServiceCategory, Service

class Command(BaseCommand):
    help = 'Populate database with service categories and services'

    def handle(self, *args, **kwargs):
        # Create service categories
        service_categories_data = [
            {"name": "HAIR - GENERAL", "id": 149184, "order": 1},
            {"name": "HAIR STYLING", "id": 324767, "order": 2},
            {"name": "HAIR COLOR", "id": 149181, "order": 3},
            {"name": "HAIR STRAIGHTENING", "id": 154870, "order": 4},
            {"name": "HAIR EXTENSION", "id": 154869, "order": 5},
            {"name": "HAIRCUT", "id": 154868, "order": 6},
            {"name": "HAIR TREATMENT", "id": 149180, "order": 7},
            {"name": "NAILS", "id": 149187, "order": 8},
            {"name": "EYEBROWS", "id": 154867, "order": 9},
            {"name": "EYELASHES", "id": 154866, "order": 10},
            {"name": "MAKEUP", "id": 149185, "order": 11},
            {"name": "FACIAL", "id": 149183, "order": 12},
            {"name": "MASSAGE", "id": 149186, "order": 13},
            {"name": "WAX", "id": 149188, "order": 14},
            {"name": "OTHERS", "id": 148798, "order": 15},
        ]

        for category_data in service_categories_data:
            ServiceCategory.objects.create(
                name=category_data["name"],
                id=category_data["id"],
                order=category_data["order"]
            )

        # Create services
        services_data = [
            # Hair General
            {"name": "Hair Wash (Kerastase Shampoo & Conditioner)", "id": 2705364, "price": 5, "category": 149184, "duration": 15},
            {"name": "Hair Wash (Regular Shampoo & Conditioner)", "id": 1420858, "price": 3, "category": 149184, "duration": 15},
            {"name": "Hair Wash with Extensions", "id": 2705365, "price": 5, "category": 149184, "duration": 30},
            {"name": "Blow Dry - Short", "id": 1273103, "price": 9, "category": 149184, "duration": 30},
            {"name": "Blow Dry - Medium", "id": 1273104, "price": 10, "category": 149184, "duration": 30},
            {"name": "Blow Dry - Long", "id": 1273105, "price": 12, "category": 149184, "duration": 45},
            {"name": "Blow Dry - Extension", "id": 2705368, "price": 15, "category": 149184, "duration": 30},
            {"name": "Blow Dry (Package)", "id": 1274007, "price": 12, "category": 149184, "duration": 45},
            {"name": "Wave - Short", "id": 2705372, "price": 12, "category": 149184, "duration": 30},
            {"name": "Wave - Medium", "id": 2705373, "price": 15, "category": 149184, "duration": 30},
            {"name": "Wave - Long", "id": 2705374, "price": 20, "category": 149184, "duration": 30},
            {"name": "Wave - Extension", "id": 2705375, "price": 25, "category": 149184, "duration": 30},
            {"name": "Wave - Package", "id": 2705378, "price": 20, "category": 149184, "duration": 30},
            {"name": "Wave - Retro", "id": 2705377, "price": 35, "category": 149184, "duration": 30},
            {"name": "Straight - SHORT HAIR", "id": 1400976, "price": 8, "category": 149184, "duration": 30},
            {"name": "Straight - Medium", "id": 1400983, "price": 15, "category": 149184, "duration": 30},
            {"name": "Straight - Long", "id": 1400985, "price": 17, "category": 149184, "duration": 30},
            {"name": "Straight (Package)", "id": 2705380, "price": 17, "category": 149184, "duration": 30},
            {"name": "Wash, Blow Dry & Wave - Short", "id": 1281309, "price": 21, "category": 149184, "duration": 30},
            {"name": "Wash, Blow Dry & Wave - Medium", "id": 1662984, "price": 25, "category": 149184, "duration": 30},
            {"name": "Wash, Blow Dry & Wave - Long", "id": 1281311, "price": 32, "category": 149184, "duration": 30},
            {"name": "Hair Styling", "id": 1287011, "price": 25, "category": 149184, "duration": 30},
            {"name": "Brazilian Treatment with Olaplex", "id": 1322819, "price": 25, "category": 149184, "duration": 30},

            # HAIR STYLING
            {"name": "Half Up Do", "id": 2716088, "price": 25, "category": 324767, "duration": 30},
            {"name": "Full Up Do", "id": 2716089, "price": 25, "category": 324767, "duration": 30},
            {"name": "Engagement Hair Style", "id": 2716090, "price": 50, "category": 324767, "duration": 120},
            {"name": "Bride Hairstyle", "id": 2716091, "price": 150, "category": 324767, "duration": 120},

            # HAIR CUT
            {"name": "haircut with blowdry", "id": 1765372, "price": 45, "category": 154868, "duration": 30},
            {"name": "trim", "id": 1361598, "price": 10, "category": 154868, "duration": 15},
            {"name": "Haircut", "id": 1294537, "price": 25, "category": 154868, "duration": 30},
            {"name": "Haircut - split ends and removal", "id": 1273098, "price": 18, "category": 154868, "duration": 60},
            {"name": "haircut with bang", "id": 1362399, "price": 5, "category": 154868, "duration": 30},

            # HAIR TREATMENT
            {"name": "Brazilian Plex Hair Treatment", "id": 1273107, "price": 25, "category": 149180, "duration": 30},
            {"name": "Hair Glow Treatment", "id": 1306959, "price": 35, "category": 149180, "duration": 60},
            {"name": "Conditioning Treatment Brazilian (PACK)", "id": 1275551, "price": 13, "category": 149180, "duration": 30},
            {"name": "Brazilian Infusion Hair Treatment", "id": 1273139, "price": 39, "category": 149180, "duration": 60},
            {"name": "Miracoil Hair Treatment", "id": 1273143, "price": 25, "category": 149180, "duration": 60},
            {"name": "Absolute Repair Hair Treatment", "id": 1273144, "price": 35, "category": 149180, "duration": 60},
            {"name": "Detox Dandruff Control", "id": 1273146, "price": 25, "category": 149180, "duration": 60},
            {"name": "Brazilian Spa: head + feet massage + Treatment", "id": 1284370, "price": 35, "category": 149180, "duration": 60},
            {"name": "Hair Treatment with Henna - LONG HAIR", "id": 1284368, "price": 12, "category": 149180, "duration": 60},
            {"name": "Hair Wash", "id": 1273112, "price": 2, "category": 149180, "duration": 15},
            {"name": "shine treatment", "id": 1845339, "price": 98, "category": 149180, "duration": 30},

            # HAIR STRAIGHTENING
            {"name": "Brazilian Hair Straightening - Short", "id": 1284330, "price": 98, "category": 154870, "duration": 90},
            {"name": "Brazilian Hair Straightening - Medium", "id": 1284331, "price": 135, "category": 154870, "duration": 90},
            {"name": "Brazilian Hair Straightening - Long", "id": 1284333, "price": 160, "category": 154870, "duration": 90},
            {"name": "Brazilian Hair Straightening - Double", "id": 2716099, "price": 170, "category": 154870, "duration": 150},
            
            # HAIR COLOR
            {"name": "Hair Test", "id": 1273128, "price": 5, "category": 149181, "duration": 30},
            {"name": "Color wash", "id": 2705383, "price": 25, "category": 149181, "duration": 60},
            {"name": "Brazilian Highlights - Short", "id": 2705384, "price": 200, "category": 149181, "duration": 240},
            {"name": "Brazilian Highlights - Medium", "id": 2705385, "price": 200, "category": 149181, "duration": 240},
            {"name": "Brazilian Highlights - Long", "id": 2705386, "price": 200, "category": 149181, "duration": 240},
            {"name": "Balayage / Ombre", "id": 2705387, "price": 200, "category": 149181, "duration": 240},
            {"name": "Hair Toning, Treatment, & blowdry", "id": 2705388, "price": 98, "category": 149181, "duration": 240},
            {"name": "Rinsage", "id": 2705389, "price": 25, "category": 149181, "duration": 60},
            {"name": "Extension Color", "id": 2705390, "price": 45, "category": 149181, "duration": 120},
            {"name": "Color Correction - Short", "id": 1273102, "price": 200, "category": 149181, "duration": 240},
            {"name": "Color Correction - Medium", "id": 1273101, "price": 280, "category": 149181, "duration": 240},
            {"name": "Color Correction - Long", "id": 1307869, "price": 290, "category": 149181, "duration": 240},
            {"name": "Brazilian Personalized Hair Treatment", "id": 1273106, "price": 15, "category": 149180, "duration": 30},
            {"name": "Root Color", "id": 1273099, "price": 25, "category": 149181, "duration": 120},
            {"name": "Root Color (Done with highlight)", "id": 1275726, "price": 20, "category": 149181, "duration": 60},

            # HAIR EXTENSION
            {"name": "One box (18) inch 55 gram", "id": 1405457, "price": 45, "category": 154869, "duration": 120},
            {"name": "One box (22) inch 55 gram", "id": 1405458, "price": 55, "category": 154869, "duration": 120},
            {"name": "Promotion 2 boxes (18) inch", "id": 1412502, "price": 90, "category": 154869, "duration": 120},
            {"name": "Promotion 2 boxes (22) inch", "id": 1412504, "price": 100, "category": 154869, "duration": 120},
            {"name": "Promotion 2 boxes (26) inch", "id": 1434193, "price": 110, "category": 154869, "duration": 120},
            {"name": "Hair Extension Removal", "id": 2716101, "price": 0, "category": 154869, "duration": 120},
            {"name": "Tape Cleaning & Application Per Pair", "id": 2716102, "price": 2, "category": 154869, "duration": 120},
            {"name": "hair extension retouch", "id": 1362398, "price": 75, "category": 154869, "duration": 120},
            {"name": "Tape In Brazilian Hair", "id": 1273097, "price": 250, "category": 154869, "duration": 120},

            # NAILS
            {"name": "Basic Manicure", "id": 1273086, "price": 6, "category": 149187, "duration": 30},
            {"name": "Basic Pedicure", "id": 1273087, "price": 7, "category": 149187, "duration": 30},
            {"name": "Nail Polish Hand", "id": 1273088, "price": 2.5, "category": 149187, "duration": 15},
            {"name": "Gelish Effect", "id": 1284441, "price": 2, "category": 149187, "duration": 30},
            {"name": "Nail extension", "id": 1273092, "price": 7, "category": 149187, "duration": 30},

            # EYEBROWS
            {"name": "Eye Brows Threading/waxing", "id": 1284374, "price": 3, "category": 154867, "duration": 30},
            {"name": "Eyebrow reshape", "id": 2716117, "price": 8, "category": 154867, "duration": 30},
            {"name": "Eyebrows Colouring Henna", "id": 1273130, "price": 3, "category": 154867, "duration": 15},
            {"name": "Rio Multivitamin Infusion Growing Hair", "id": 2716118, "price": 25, "category": 154867, "duration": 90},
            {"name": "Eyebrow Lamination / Botox", "id": 2716119, "price": 45, "category": 154867, "duration": 90},
            {"name": "Eyebrow lamination / Botox - Tinting", "id": 2716120, "price": 5, "category": 154867, "duration": 30},
            {"name": "Rio eyebrow+ lamination", "id": 2716122, "price": 60, "category": 154867, "duration": 90},

            # EYELASH
            {"name": "Eyelash Extension Permanent - Short/Medium", "id": 1275564, "price": 45, "category": 154866, "duration": 90},
            {"name": "Eyelash Extension Permanent - Short/Medium Maintenance - 2 Week", "id": 2716106, "price": 20, "category": 154866, "duration": 60},
            {"name": "Eyelash Extension Permanent - Short/Medium Maintenance - 3 Week", "id": 2716107, "price": 30, "category": 154866, "duration": 60},
            {"name": "Eyelash Extension Permanent - Long", "id": 1283289, "price": 60, "category": 154866, "duration": 90},
            {"name": "Eyelash Extension Permanent - Long Maintenance - 2 Week", "id": 2716109, "price": 25, "category": 154866, "duration": 60},
            {"name": "Eyelash Extension Permanent - Long Maintenance - 3 Week", "id": 2716110, "price": 40, "category": 154866, "duration": 60},
            {"name": "Permanent Eyelash Removal", "id": 1283290, "price": 15, "category": 154866, "duration": 30},
            {"name": "Lash Lift", "id": 2716111, "price": 30, "category": 154866, "duration": 60},
            {"name": "Lash Tinting", "id": 2716112, "price": 5, "category": 154866, "duration": 30},
            {"name": "Eyelash Extension Permanent (PACK)", "id": 1284895, "price": 39, "category": 154866, "duration": 90},

            # MAKEUP
            {"name": "Eye Make Up", "id": 2716124, "price": 20, "category": 149185, "duration": 30},
            {"name": "Eyeliner", "id": 2716126, "price": 10, "category": 149185, "duration": 30},
            {"name": "Face Painting", "id": 2716128, "price": 25, "category": 149185, "duration": 30},
            {"name": "Eyelashes", "id": 2716129, "price": 7, "category": 149185, "duration": 30},
            {"name": "Eyebrows Microblading", "id": 2716132, "price": 375, "category": 149185, "duration": 120},
            {"name": "Lips Micropigmentation", "id": 2716133, "price": 325, "category": 149185, "duration": 120},
            {"name": "Mole", "id": 2716137, "price": 15, "category": 149185, "duration": 30},
            {"name": "Hydra Gloss", "id": 2716138, "price": 35, "category": 149185, "duration": 60},
            {"name": "Regular makeup", "id": 1274045, "price": 35, "category": 149185, "duration": 30},
            {"name": "Engagement Make Up", "id": 2716131, "price": 60, "category": 149185, "duration": 90},
            {"name": "Makeup Wedding", "id": 1274046, "price": 150, "category": 149185, "duration": 120},
            
            # FACIAL
            {"name": "Facial with white mask", "id": 2716142, "price": 25, "category": 149183, "duration": 60},
            {"name": "Brazilian Facial Treatment: Clean, Glow, and Energize", "id": 2716143, "price": 35, "category": 149183, "duration": 60},
            {"name": "Brazilian gloss: Deep cleaning with full extraction + Mask", "id": 2716144, "price": 45, "category": 149183, "duration": 60},
            {"name": "Facial clean mask and Vitamin C serum", "id": 2716145, "price": 45, "category": 149183, "duration": 60},
            
            # MASSAGE:
            {"name": "Rio Flow Sense", "id": 2716147, "price": 10, "category": 149186, "duration": 30},
            {"name": "Oil Face Massage", "id": 1273094, "price": 15, "category": 149186, "duration": 15},
            {"name": "Brazilian Detox massage", "id": 1273095, "price": 69, "category": 149186, "duration": 120},
            {"name": "Brazilian Facial Total Clean", "id": 1273093, "price": 24, "category": 149186, "duration": 90},
            {"name": "Relaxing Massage (30 minutes)", "id": 1284311, "price": 14, "category": 149186, "duration": 30},
            {"name": "Lymphatic Drainage", "id": 2716148, "price": 35, "category": 149186, "duration": 90},
            {"name": "Relaxing Massage (60)", "id": 1284312, "price": 25, "category": 149186, "duration": 60},
            {"name": "Foot Massage (5 minutes)", "id": 1284313, "price": 5, "category": 149186, "duration": 30},
            {"name": "Service Name", "id": 1284315, "price": 0, "category": 149186, "duration": 30},

            # WAXING AND THREADING
            {"name": "Brazilian Wax Half Back", "id": 2716152, "price": 3, "category": 149188, "duration": 30},
            {"name": "Brazilian Wax Full Face", "id": 2716155, "price": 8, "category": 149188, "duration": 30},
            {"name": "Facial Side Wax", "id": 2716156, "price": 4, "category": 149188, "duration": 30},
            {"name": "Facial Side Wax and Upper Lip", "id": 2716157, "price": 6, "category": 149188, "duration": 30},
            {"name": "Nose Wax", "id": 2716158, "price": 2, "category": 149188, "duration": 30},
            {"name": "Brazilian wax or threading upper Lip", "id": 2716160, "price": 2, "category": 149188, "duration": 30},
            {"name": "Brazilian Wax or Threading upperlip and chin", "id": 2716161, "price": 3, "category": 149188, "duration": 30},
            {"name": "Brazilian wax or Threading chin", "id": 2716162, "price": 1.5, "category": 149188, "duration": 30},
            {"name": "Full face Threading", "id": 2716163, "price": 5, "category": 149188, "duration": 30},
            {"name": "Brazilian Full body", "id": 1276309, "price": 28, "category": 149188, "duration": 45},
            {"name": "Brazilian Half Legs", "id": 1276300, "price": 5, "category": 149188, "duration": 30},
            {"name": "Brazilian Full legs", "id": 1276308, "price": 8, "category": 149188, "duration": 30},
            {"name": "Brazilian Half Arms", "id": 1276307, "price": 4, "category": 149188, "duration": 15},
            {"name": "Brazilian Full Arms", "id": 1276306, "price": 7, "category": 149188, "duration": 30},
            {"name": "Brazilian Underarm", "id": 1276303, "price": 4, "category": 149188, "duration": 15},
            {"name": "Brazilian Wax Full Back", "id": 1276301, "price": 5, "category": 149188, "duration": 30},
            {"name": "Brazilian Wax Stomach", "id": 1276302, "price": 5, "category": 149188, "duration": 15},
            {"name": "Brazilian Bikini Wax", "id": 1276311, "price": 10, "category": 149188, "duration": 20},
            {"name": "Brazilian bikini Wax - Front & Back", "id": 1306966, "price": 15, "category": 149188, "duration": 60},

            # End
        ]

        for service_data in services_data:
            category_id = service_data.pop("category")
            try:
                category = ServiceCategory.objects.get(id=category_id)
                print(f"Creating Service with category: {category}")
                Service.objects.create(category=category, **service_data)
            except ServiceCategory.DoesNotExist:
                print(f"ServiceCategory with ID {category_id} does not exist.")
            except Exception as e:
                print(f"Error creating Service with category ID {category_id}: {e}")
