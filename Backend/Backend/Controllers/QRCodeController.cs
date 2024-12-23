using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QrCodeController : ControllerBase
    {
        private readonly IQrCodeService _qrCodeService;

        public QrCodeController(IQrCodeService qrCodeService)
        {
            _qrCodeService = qrCodeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQRCode([FromBody] QRCodeDto qrCodeDto)
        {
            try
            {
                var result = await _qrCodeService.CreateQRCode(qrCodeDto);
                return CreatedAtAction(nameof(GetQRCodeById), new { qrCodeId = result.QRCodeID }, result);
            }
            catch
            {
                return StatusCode(500, "Internal server error while creating QR code.");
            }
        }

        [HttpGet("{qrCodeId}")]
        public async Task<IActionResult> GetQRCodeById(int qrCodeId)
        {
            var qrCode = await _qrCodeService.GetQRCodeById(qrCodeId);
            if (qrCode == null)
                return NotFound();

            return Ok(qrCode);
        }

        [HttpPut("{qrCodeId}/deactivate")]
        public async Task<IActionResult> DeactivateQRCode(int qrCodeId)
        {
            var result = await _qrCodeService.DeactivateQRCode(qrCodeId);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPut("scan/{qrCodeId}")]
        public async Task<IActionResult> ScanQRCode(int qrCodeId)
        {
            var result = await _qrCodeService.ScanQRCode(qrCodeId);
            if (!result)
                return BadRequest(new { message = "QR Code is invalid or has already been used." });

            return Ok(new { message = "QR Code scanned successfully." });
        }
    }
}