namespace backend.src.DTOs.List;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using backend.src.Models;

public class ListUpdateDTO : BaseDTO<List>
{
    [Required]
    public string Title { get; set; } = null!;
}