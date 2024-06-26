from django.db import models
from workspace.models.clients import Client
from workspace.models.staff import Staff
from workspace.models.resources import ResourceItem
from workspace.models.services import Service
from workspace.models.packages import Package
from workspace.models.products import Product

from workspace.utils.choices import STATUS_CHOICES

# Invoice
# {
#     "cashupEnabled": false,
#     "registerId": null,
#     "loggedInStaffId": null,
#     "greenFeeProduct": null,
#     "staff": [
#         {
#             "staffId": 445024,
#             "name": "Neia",
#             "fullName": "Neia .",
#             "imageUrl": "",
#             "locationIds": [
#                 148566
#             ],
#             "references": [],
#             "orderKey": null
#         },
#         {
#             "staffId": 285077,
#             "name": "Receptionist",
#             "fullName": "Receptionist Rio",
#             "imageUrl": "https://app.gettimely.com/azure/timely-images/22fc2df1-9238-410f-ad54-1c59b5e3b030.jpg",
#             "locationIds": [],
#             "references": [],
#             "orderKey": null
#         },
#         {
#             "staffId": 280034,
#             "name": "Laura",
#             "fullName": "Laura .",
#             "imageUrl": "",
#             "locationIds": [
#                 148566
#             ],
#             "references": [],
#             "orderKey": 5
#         }
#     ],
#     "discounts": [
#         {
#             "name": "General/Misc",
#             "type": "Discount",
#             "discountValue": null,
#             "percentage": null,
#             "isPercentage": false,
#             "discountId": 165532,
#             "discountType": "NotSet",
#             "taxId": null
#         }
#     ],
#     "availableGiftVouchers": [
#         {
#             "type": "GiftVoucher",
#             "name": "Enter an amount",
#             "giftVoucherId": 89195,
#             "isCustomAmount": true,
#             "unitPrice": 0.000,
#             "unitPriceInc": 0.0000,
#             "totalInc": 0.0000,
#             "taxAmount": 0.000,
#             "includesTax": true,
#             "quantity": 1.0,
#             "taxId": 0,
#             "fullUnitPrice": 0.000,
#             "fullUnitPriceInc": 0.0000
#         }
#     ],
#     "hasPaymentGateway": false,
#     "timelyPaySignUpAllowed": false,
#     "terminalsEnabled": false,
#     "terminalsSurcharge": null,
#     "terminalsServerSideIntegrationEnabled": false,
#     "terminalsCreateInvoiceFirst": false,
#     "timelyPayTerminalsCreateDraftSalesOnPaymentAttempt": false,
#     "locations": [
#         {
#             "name": "Rio Brazil Salon",
#             "locationId": 148566,
#             "useThermalReceipt": true,
#             "isCurrent": true,
#             "stripeTerminalLocationId": null,
#             "orderKey": 0,
#             "terminals": []
#         }
#     ],
#     "accountingIntegration": null,
#     "paymentTypes": [
#         {
#             "paymentTypeId": 2,
#             "name": "Credit card",
#             "type": "CreditCard"
#         },
#         {
#             "paymentTypeId": 1,
#             "name": "Cash",
#             "type": "Cash"
#         },
#         {
#             "paymentTypeId": 40209,
#             "name": "Payment Link",
#             "type": "Custom"
#         }
#     ],
#     "savedCards": null,
#     "customer": {
#         "customerId": 70029192,
#         "fullName": "Hala huwam 2",
#         "firstName": "Hala",
#         "lastName": "huwam 2",
#         "pronouns": [],
#         "companyName": "",
#         "emailAddress": "",
#         "smsNumber": "65625040",
#         "smsCode": "965",
#         "fullSmsNumber": "+96565625040",
#         "isVip": false,
#         "alert": null
#     },
#     "customerBalances": {
#         "outStandingBalance": 0.00,
#         "creditBalance": 0.0,
#         "hasRewardsEnabled": false,
#         "hasRewardsToSpend": false,
#         "isRewardsAvailable": false,
#         "rewardsVoucherBalance": 0.0,
#         "rewardsPointsBalance": 0,
#         "rewardsPointsToNextVoucher": 0
#     },
#     "customerGiftVouchers": [],
#     "promoCodes": [],
#     "hasAccessToAddingStoredCards": false,
#     "requireBillingAddress": false,
#     "systemTimeZoneId": "Asia/Riyadh",
#     "localeDateFormat": "en-GB",
#     "useAmPmTimeFormat": true,
#     "updateCardUrl": "https://bookings.gettimely.com/riobrazilsalon/cards",
#     "businessName": "Rio Brazil Salon",
#     "packageTemplate": false
# }


# STATUS
# "startDateLocalised": "Sat, 4 Mar 2023",
# "bookingGroupId": 254487466,
# "bookingId": 315758705,
# "classId": null,
# "isRecurring": false,
# "hasConcessionOrPackage": false,
# "hasSingleLocation": true,
# "isOnlineBooking": false,
# "confirmationStatusId": 5,
# "isRestrictedLocation": false



# PAYMENT
# "invoiceId": null,
# "isInvoiced": false,
# "isPaid": false,


class AppointmentService(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start = models.DateTimeField()
    end = models.DateTimeField()
    duration = models.PositiveIntegerField(default=30)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    resources = models.ManyToManyField(ResourceItem, blank=True)

    def __str__(self):
        return str(self.service)

    class Meta:
        db_table = "appointment_service"


class AppointmentPackage(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.package)

    class Meta:
        db_table = "appointment_package"


class AppointmentProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    # Additional fields specific to products can be added here

    def __str__(self):
        return str(self.product)

    class Meta:
        db_table = "appointment_product"


# Appointment Model
class Appointment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
    status = models.IntegerField(
        choices=STATUS_CHOICES, default=1, blank=True, null=True)
    services = models.ManyToManyField(
        AppointmentService, related_name='appointments_service')
    packages = models.ManyToManyField(
        AppointmentPackage, related_name='appointments_package')
    products = models.ManyToManyField(
        AppointmentProduct, related_name='appointments_product')

    # className: " fc-booking fc-pending fc-booking-id-390770017 fc-group-311035140  fc-hidden-event"
    # className = models.ManyToManyField(AppointmentProduct, related_name='appointments_product')

    def __str__(self):
        return f"Appointment with {self.client} on {self.start}"

    def allocate_resources(self):
        # Logic to allocate resources based on minimize_switching and match_resources settings
        pass

    class Meta:
        db_table = "appointment"


class AppointmentNote(models.Model):
    appointment = models.OneToOneField(
        Appointment, related_name='note', on_delete=models.CASCADE)
    note = models.TextField()

    def __str__(self):
        return f"Note for {self.appointment}"

    def __str__(self):
        return str(self.appointment.client.first_name)

    class Meta:
        db_table = "appointment_note"

# Service Model

# Service Provider Model


class ServiceProvider(models.Model):
    service = models.ForeignKey(AppointmentService, on_delete=models.CASCADE)
    employee = models.ForeignKey(Staff, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee} - {self.service}"

    class Meta:
        db_table = "service_provider"
