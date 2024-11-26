namespace Backend.DTOs
{
    public class OrderDto
    {
        public int OrderID { get; set; }
        public int QRCodeID { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Mobile { get; set; }
        public decimal TotalAmount { get; set; }
        public int OrderStatusID { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
    }
}