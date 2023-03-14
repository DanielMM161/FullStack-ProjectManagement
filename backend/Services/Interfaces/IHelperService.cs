using backend.Models;

namespace backend.Services.Interfaces;

public interface IHelpserService
{
    Task<int> CheckUserBelongProject(int userId, Project project);
    Task<Project?> CheckProject(int projectId);
}