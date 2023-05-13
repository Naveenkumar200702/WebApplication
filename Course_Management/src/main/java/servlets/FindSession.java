package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

/**
 * Servlet implementation class FindSession
 */
@WebServlet("/FindSession")
public class FindSession extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public FindSession() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String name = (String) session.getAttribute("name");
		String user = (String) session.getAttribute("option");
		String pName=(String) session.getAttribute("ofName");
		if (name != null) {
			JSONObject result=new JSONObject();
			result.put("name",name);
			result.put("user",user);
			result.put("pName",pName);
			
				response.getWriter().append(result.toString());
			
		} else {
			response.getWriter().append("-1");
		}
	}

}
