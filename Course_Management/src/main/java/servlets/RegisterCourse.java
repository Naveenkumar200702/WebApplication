package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.RegisterCourseDetails;


@WebServlet("/RegisterCourse")
public class RegisterCourse extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public RegisterCourse() {
        super();
       
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session =request.getSession();
		String studentId=(String) session.getAttribute("name");
		String courseId=request.getParameter("courseid");
		System.out.println(courseId);
		RegisterCourseDetails register=new RegisterCourseDetails();
		int result=register.registerCourse(Integer.parseInt(courseId), studentId);
		response.getWriter().print(result);
	}
}
