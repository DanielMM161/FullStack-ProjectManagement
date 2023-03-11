using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request;

public class UpdateListRequest
{
    [Required]
    public string Title { get; set; } = null!;
}