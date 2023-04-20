package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import model.CourseDetails;

@WebServlet("/GetCourseDetail")
public class GetCourseDetail extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetCourseDetail() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		CourseDetails detail = new CourseDetails();
		JSONObject courseDetails = detail.getCourseDetails();
		response.getWriter().append(courseDetails.toString());
	}
}
