namespace backend.DTOs.Request.Tasks;

public class PatchSubTaskRequest
{
    public string? Title { get; set; }
    public bool? Done { get; set; }
}