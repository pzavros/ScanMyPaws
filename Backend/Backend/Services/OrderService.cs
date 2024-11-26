using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OrderDto> CreateOrder(OrderDto orderDto)
        {
            try
            {
                var newOrder = new Order
                {
                    QRCodeID = orderDto.QRCodeID,
                    Name = orderDto.Name,
                    Surname = orderDto.Surname,
                    Email = orderDto.Email,
                    Mobile = orderDto.Mobile,
                    TotalAmount = orderDto.TotalAmount,
                    OrderStatusID = orderDto.OrderStatusID,
                    Street = orderDto.Street,
                    City = orderDto.City,
                    PostalCode = orderDto.PostalCode,
                    Country = orderDto.Country,
                    OrderDate = orderDto.OrderDate ?? DateTime.Now,
                    DateCreated = orderDto.DateCreated ?? DateTime.Now,
                    DateModified = orderDto.DateModified
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                return new OrderDto
                {
                    OrderID = newOrder.OrderID,
                    QRCodeID = newOrder.QRCodeID,
                    Name = newOrder.Name,
                    Surname = newOrder.Surname,
                    Email = newOrder.Email,
                    Mobile = newOrder.Mobile,
                    TotalAmount = newOrder.TotalAmount,
                    OrderStatusID = newOrder.OrderStatusID,
                    Street = newOrder.Street,
                    City = newOrder.City,
                    PostalCode = newOrder.PostalCode,
                    Country = newOrder.Country,
                    OrderDate = newOrder.OrderDate,
                    DateCreated = newOrder.DateCreated,
                    DateModified = newOrder.DateModified
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while saving the order.", ex);
            }
        }


    }
}