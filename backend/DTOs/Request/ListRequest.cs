namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;
using backend.Models;

public class ListRequest
{
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public int ProjectId { get; set; }

    public void UpdateModel(List model)
    {
        model.Title = Title;
        model.ProjectId = ProjectId;
    }
}