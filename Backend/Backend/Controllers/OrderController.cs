using Backend.DTOs;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IQrCodeService _qrCodeService;

        public OrderController(IOrderService orderService, IQrCodeService qrCodeService)
        {
            _orderService = orderService;
            _qrCodeService = qrCodeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            Console.WriteLine($"Received payload: {System.Text.Json.JsonSerializer.Serialize(orderDto)}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Generate QR Code
                var qrCodeDto = await _qrCodeService.CreateQRCode(new QRCodeDto());
                orderDto.QRCodeID = qrCodeDto.QRCodeID;

                // Create the order
                var createdOrder = await _orderService.CreateOrder(orderDto);

                return Ok(new
                {
                    message = "Order created successfully!",
                    orderId = createdOrder.OrderID,
                    qrCodeId = qrCodeDto.QRCodeID,
                    qrCodeImage = qrCodeDto.QRCodeImage
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}