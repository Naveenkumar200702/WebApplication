package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.GetVedio;
import model.IsCourseRegistered;

@WebServlet("/GetVedioLink")
public class GetVedioLink extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public GetVedioLink() {
        super();
    
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		GetVedio vedio=new GetVedio();
		IsCourseRegistered isRegister=new IsCourseRegistered();
		String courseid=(String) request.getParameter("courseid");
		String week=(String)request.getParameter("week");
		HttpSession session = request.getSession();
		String userName=(String)session.getAttribute("name");
		long val=isRegister.isRegistered(Integer.parseInt(courseid),userName);
		int weekNo=Integer.parseInt(week);
		System.out.println(val);
		if(val>=1)
		{
			int days=weekNo*7;
			if(days<=val) {
				String vedioLink=vedio.getVedio(Integer.parseInt(courseid), Integer.parseInt(week),userName);
				System.out.println(vedioLink);
				response.getWriter().append(""+vedioLink);
			}
			else {
				response.getWriter().append(""+(days-val));
			}
		}
		else {
			response.getWriter().print(-2);
		}
		
	}

	
	
}
