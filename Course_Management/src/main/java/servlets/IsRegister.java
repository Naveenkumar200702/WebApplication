package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.IsCourseRegistered;

/**
 * Servlet implementation class IsRegister
 */
@WebServlet("/IsRegister")
public class IsRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public IsRegister() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		IsCourseRegistered isCourseRegistered=new IsCourseRegistered();
		HttpSession session =request.getSession();
		String studentId=(String) session.getAttribute("name");
		String courseId=(String) request.getParameter("courseId");
		String staffId=(String) request.getParameter("staffId");
		System.out.println(courseId);
		int flag=isCourseRegistered.isRegistered(Integer.parseInt(courseId),studentId);// int converted into long check this later
		if(staffId.equals(studentId)){
			flag=1;
		}
		response.getWriter().print(flag);
	}
}
