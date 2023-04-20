package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.GetMyCourseDetail;


@WebServlet("/GetMyCourse")
public class GetMyCourse extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public GetMyCourse() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String userName = (String) session.getAttribute("name");
		GetMyCourseDetail getCourseDetail=new GetMyCourseDetail();
		JSONObject obj=getCourseDetail.getMyCourseDetail(userName);
		response.getWriter().append(obj.toString());
	}

}
