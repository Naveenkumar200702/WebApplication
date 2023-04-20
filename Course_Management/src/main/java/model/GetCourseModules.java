package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.json.JSONObject;

import dbcon.Connect;

public class GetCourseModules {
	public JSONObject getCourseModules(int courseid){
		Connection con=Connect.getInstance().con;
		String query="SELECT * FROM modules WHERE courseId=?";
		JSONObject outer=new JSONObject();
		try {
			PreparedStatement ps=con.prepareStatement(query);
			ps.setInt(1, courseid);
			ResultSet rs=ps.executeQuery();
			int i=0;
			while(rs.next()) {
				JSONObject inner=new JSONObject();
				inner.put("courseid",rs.getInt("courseId"));
				inner.put("module", rs.getString("module"));
				inner.put("vedio",rs.getString("vedio_tutorial"));
				inner.put("weeks", rs.getInt("weeks"));
				outer.put(""+i, inner);
				i++;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return outer;
		
	}

}
