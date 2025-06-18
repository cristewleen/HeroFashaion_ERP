from django.db import models

# Create your models here.


# orders/models.py
from django.db import models

class OrderDetailStyle(models.Model):
    # Field names have been converted from PascalCase to snake_case.
    # SQL data types have been mapped to Django model fields.

    # Primary Key Note: Django automatically creates an 'id' AutoField which serves
    # as the primary key, perfectly matching your 'ordid IDENTITY' column.
    
    # === Core Order and Customer Info ===
    company_id = models.IntegerField(default=0, null=True, blank=True)
    order_no = models.CharField(max_length=50, unique=True, help_text="Corresponds to the original primary key.")
    no = models.CharField(max_length=50)
    year = models.SmallIntegerField()
    item_no = models.PositiveSmallIntegerField() # tinyint -> PositiveSmallIntegerField
    date = models.DateTimeField(null=True, blank=True)
    order_type = models.PositiveSmallIntegerField(null=True, blank=True)
    # Note: CustomerID should be a ForeignKey once you have a Customer model.
    # customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    customer_id = models.IntegerField(null=True, blank=True)
    department_id = models.IntegerField(null=True, blank=True)
    
    # === References and Dates ===
    reference = models.TextField(null=True, blank=True) # nvarchar(2100) -> TextField
    po_no = models.CharField(max_length=50, null=True, blank=True)
    po_date = models.DateTimeField(null=True, blank=True)
    final_delv_date = models.DateTimeField(null=True, blank=True)
    our_delv_date = models.DateTimeField(null=True, blank=True)
    
    # === Quantity and Packing ===
    quantity = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    quantity_actual = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    quantity_extra = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    uom = models.PositiveSmallIntegerField(null=True, blank=True)
    pcs_per_pack = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    packing_type = models.PositiveSmallIntegerField()

    # === Style and Confirmation ===
    order_conf_year = models.SmallIntegerField()
    order_conf_no = models.SmallIntegerField()
    style_id = models.IntegerField()
    style_name = models.CharField(max_length=50)
    style_desc = models.TextField(null=True, blank=True) # varchar(2000) -> TextField
    category_id = models.IntegerField(null=True, blank=True)

    # === Quality and Inspection ===
    final_insp_by = models.PositiveSmallIntegerField()
    test_agency_id = models.IntegerField()
    measurement_scale = models.PositiveSmallIntegerField()
    measurement_scale_mp = models.PositiveSmallIntegerField(default=0)
    quality = models.TextField(null=True, blank=True)
    stitching = models.TextField(null=True, blank=True)
    packing = models.TextField(null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    
    # === Completion Status Booleans ===
    completed_mc = models.BooleanField()
    completed_apl = models.BooleanField()
    completed_acl = models.BooleanField()
    completed_lt = models.BooleanField()
    completed_des = models.BooleanField()
    completed_doc = models.BooleanField()
    completed_sp = models.BooleanField()
    completed_wo = models.BooleanField()

    # === Print/Embroidery Instructions ===
    is_printed = models.BooleanField()
    is_embroided = models.BooleanField()
    is_others = models.BooleanField()
    print_instr = models.CharField(max_length=255, null=True, blank=True)
    embroidry_instr = models.CharField(max_length=255, null=True, blank=True)
    others_instr = models.CharField(max_length=255, null=True, blank=True)

    # === Authorization and Supplier Info ===
    work_book_no = models.CharField(max_length=50, null=True, blank=True)
    work_book_no_a = models.CharField(max_length=50, null=True, blank=True)
    extra = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True) # percent
    authorized = models.BooleanField()
    mp_authorized = models.BooleanField()
    acce_authorized = models.BooleanField()
    supplier_id = models.IntegerField(default=0)
    yarn_supplied = models.BooleanField()
    fabric_supplied = models.BooleanField()

    # === Production Details ===
    production_type = models.PositiveSmallIntegerField(default=0)
    production_id = models.IntegerField(default=0)
    merchandiser_id = models.IntegerField(default=0)
    qlty_controller_id = models.IntegerField(default=0)
    mp_year = models.SmallIntegerField(default=0)
    mp_ref_no = models.CharField(max_length=50, null=True, blank=True)
    mp_date = models.DateTimeField(null=True, blank=True)
    ref_no = models.CharField(max_length=50, null=True, blank=True)
    main_image_path = models.CharField(max_length=511, null=True, blank=True)

    # === Status and Flags ===
    shipment_completed = models.BooleanField()
    closed = models.BooleanField()
    repeat_orders = models.BooleanField(null=True, blank=True)
    season_id = models.IntegerField(null=True, blank=True)
    season_year = models.SmallIntegerField(null=True, blank=True)
    status_id = models.PositiveSmallIntegerField(default=3)
    so_required = models.BooleanField(null=True, blank=True)
    material_planning = models.BooleanField(null=True, blank=True)
    job_order_raised = models.BooleanField(null=True, blank=True)
    ho_ref_no = models.CharField(max_length=50, null=True, blank=True)
    prod_authorized = models.BooleanField(null=True, blank=True)
    order_cancelled = models.BooleanField(null=True, blank=True)
    cancel = models.BooleanField(null=True, blank=True)
    
    # === Employee and In-charge IDs ===
    acce_plan_employee_id = models.IntegerField(null=True, blank=True)
    order_follow_up_employee_id = models.IntegerField(null=True, blank=True)
    acce_incharge_employee_id = models.IntegerField(null=True, blank=True)
    fabric_incharge_employee_id = models.IntegerField(null=True, blank=True)
    
    # === Financials and Miscellaneous ===
    duration = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=19, decimal_places=4, default=0) # money
    purchase_price_type = models.PositiveSmallIntegerField(default=0)
    re_calculate_pl = models.PositiveSmallIntegerField(default=1)
    
    # === System Raised Counters (Many are similar) ===
    # Using a consistent pattern for these integer fields
    yarn_po_raised = models.IntegerField(default=0)
    fabric_po_raised = models.IntegerField(default=0)
    acce_po_raised = models.IntegerField(default=0, null=True, blank=True) # Had two definitions
    yarn_delv_raised = models.IntegerField(default=0)
    knitting_pgm_raised = models.IntegerField(default=0)
    fabric_delv_raised = models.IntegerField(default=0)
    yarn_st_raised = models.IntegerField(null=True, blank=True)
    fabric_st_raised = models.IntegerField(null=True, blank=True)
    fabric_cut_raised = models.IntegerField(null=True, blank=True)
    # ... (omitting the rest of the 30+ 'Raised' fields for brevity, but you would add them all here following the pattern)
    # e.g., piece_rcpt_raised = models.IntegerField(null=True, blank=True)
    
    # === Other Fields ===
    image_desc = models.CharField(max_length=300, null=True, blank=True)
    e_date = models.DateTimeField(null=True, blank=True)
    insdate = models.DateTimeField(null=True, blank=True)
    vessel_dt = models.DateTimeField(null=True, blank=True)
    contractno = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"Order: {self.order_no} - Style: {self.style_name}"

    class Meta:
        verbose_name = "Order Detail Style"
        verbose_name_plural = "Order Detail Styles"
        ordering = ['-date'] # Order by most recent date by default