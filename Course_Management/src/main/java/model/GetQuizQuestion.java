package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.json.JSONArray;
import org.json.JSONObject;

import dbcon.Connect;

public class GetQuizQuestion {
	public JSONObject getQuizQuestion(int courseid) {
		Connection con=Connect.getInstance().con;
		String Query="SELECT * FROM quiz WHERE courseid=?";
		JSONObject outer=new JSONObject();
		try {
			PreparedStatement ps=con.prepareStatement(Query);
			int i=0;
			ps.setInt(1, courseid);
			ResultSet rs=ps.executeQuery();
			while(rs.next()) {
				JSONObject inner=new JSONObject();
				
				inner.put("question", rs.getString("question"));
				JSONArray option=new JSONArray();
					option.put(rs.getString("option1"));
					option.put(rs.getString("option2"));
					option.put(rs.getString("option3"));
					option.put(rs.getString("option4"));
					inner.put("option", option);
				inner.put("answer", rs.getString("answer"));
				outer.put(""+i,inner);
				i++;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		
		return outer;
	}

}
