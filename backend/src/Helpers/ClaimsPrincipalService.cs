namespace backend.src.Helpers;

using System.Security.Claims;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using Microsoft.AspNetCore.Authorization;

public class ClaimsPrincipalService : IClaimsPrincipalService
{
    public ClaimsPrincipal User;
    private readonly IAuthorizationService _authService;

    public ClaimsPrincipalService(ClaimsPrincipal user, IAuthorizationService authService)
    {
        User = user;
        _authService = authService;
    }

    public int GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier);
        return Convert.ToInt32(claim != null ? claim.Value : "-1");
    }

    public ClaimsPrincipal GetClaim()
    {
        return User;
    }

    public async Task<Project> IsProjectExist(int projectId, IProjectRepo projectRepo)
    {
        var project = await projectRepo.GetByIdAsync(projectId);
        if (project is null)
        {
            Console.WriteLine("project not succeded");
            throw ServiceException.NotFound();
        }

        return project;
    }

    public async Task CheckUserBelongProject(Project project)
    {
        var authorization = await _authService.AuthorizeAsync(User, project, "Belong");
        if (!authorization.Succeeded)
        {
            Console.WriteLine("CheckUserBelongProject not succeded");
            throw ServiceException.Unauthorized("You must belong to the Project");
        }
    }
}