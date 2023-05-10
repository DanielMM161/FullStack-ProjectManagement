namespace backend.src.Authorization;

using System.Security.Claims;
using System.Threading.Tasks;
using backend.src.Models;
using Microsoft.AspNetCore.Authorization;

public class IsUserBelongProjectHandler : AuthorizationHandler<IsUserBelongProject, Project>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsUserBelongProject requirement, Project resource)
    {
        var claim = context.User.FindFirst(ClaimTypes.NameIdentifier);
        var userId = Convert.ToInt32(claim != null ? claim.Value : "-1");
        if (resource.Users.Select(u => u.Id).Contains(userId))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}