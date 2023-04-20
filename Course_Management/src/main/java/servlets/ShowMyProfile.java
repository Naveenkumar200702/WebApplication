package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.GetMyProfile;

/**
 * Servlet implementation class ShowMyProfile
 */
@WebServlet("/ShowMyProfile")
public class ShowMyProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public ShowMyProfile() {
        super();
       
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String userName=(String) session.getAttribute("name");
		String userOption=(String) session.getAttribute("option");
		GetMyProfile profile=new GetMyProfile();
		JSONObject myProfile=profile.getMyProfile(userName,userOption);
		response.getWriter().append(""+myProfile.toString());
	}


}
