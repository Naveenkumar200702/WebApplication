package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import model.GetCourseModules;

/**
 * Servlet implementation class GetModules
 */
@WebServlet("/GetModules")
public class GetModules extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public GetModules() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		GetCourseModules modules=new GetCourseModules();
		String courseid=request.getParameter("courseid");
		JSONObject courseModules=modules.getCourseModules(Integer.parseInt(courseid));
		System.out.println(courseModules);
		response.getWriter().print(courseModules.toString());
	}

}
