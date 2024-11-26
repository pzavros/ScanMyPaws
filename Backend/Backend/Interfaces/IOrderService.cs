using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrder(OrderDto orderDto);
    }
}