using Edamam.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Http.Headers;

namespace Edamam.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("food")]
        public async Task<object> GetRecipes(String ingredient)
        {
            var url = $"https://api.edamam.com/api/recipes/v2";
            var parameters = $"?type=public&q={ingredient}&app_id=243f36db&app_key=34eaf50a5dd9e76a885e7a2dff2e3d84";
            object results = new object(); 


            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(parameters).ConfigureAwait(false);

            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                results = jsonString;
            }

            return results;
        }
    }
}
             