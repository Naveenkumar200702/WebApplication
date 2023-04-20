package filters;

import javax.servlet.http.HttpSession;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;


@WebFilter(urlPatterns={"/IsRegister","/RegisterCourse","/ReadingMaterial","/GetVedioLink","/GetQuiz"})
public class CheckLoginFilter implements Filter{
	 
	public CheckLoginFilter() {
	        super();
	    }

		
		public void destroy() {	
		}

		
		public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
			HttpSession session =((HttpServletRequest)request).getSession();
			String checkLogin=(String)session.getAttribute("name");
			System.out.println("CheckLoginFilter");
			if(checkLogin==null)
				response.getWriter().print(-1);
			else
				chain.doFilter(request, response);
		}

		public void init(FilterConfig fConfig) throws ServletException {
			
		}
	

}
