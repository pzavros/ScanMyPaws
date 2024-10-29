using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IQrCodeService
    {
        Task<QRCodeDto> CreateQRCode(QRCodeDto qrCodeDto);
        Task<QRCodeDto> GetQRCodeById(int qrCodeId);
        Task<bool> DeactivateQRCode(int qrCodeId);
    }
}