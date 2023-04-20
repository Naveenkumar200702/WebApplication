package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.GetStaffCourse;


@WebServlet("/GetStaffCourseDetail")
public class GetStaffCourseDetail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public GetStaffCourseDetail() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		GetStaffCourse getCourse=new GetStaffCourse();
		HttpSession session = request.getSession();
		String userName=(String) session.getAttribute("name");
		JSONObject courseDetail=getCourse.getStaffCourse(userName);
		response.getWriter().append(courseDetail.toString());
	}
}
