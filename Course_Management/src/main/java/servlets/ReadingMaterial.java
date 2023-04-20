package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.GetReadingMaterial;

/**
 * Servlet implementation class ReadingMaterial
 */
@WebServlet("/ReadingMaterial")
public class ReadingMaterial extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ReadingMaterial() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		GetReadingMaterial rMaterial=new GetReadingMaterial();
		String courseId=request.getParameter("courseId");
		String result=rMaterial.getReadingMaterial(Integer.parseInt(courseId));
		response.getWriter().print(result);
	}

	
	

}
