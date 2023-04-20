package dto;


public class NewStudent {

	private String newUser;
	private String mail;
	private String password;
	private String name;
	private String dob;
	private String phoneno;
	private String qualify;
	
	
	
	public NewStudent(String newUser, String mail, String password, String name, String dob, String phoneno,
			String qualify) {
		super();
		this.newUser = newUser;
		this.mail = mail;
		this.password = password;
		this.name = name;
		this.dob = dob;
		this.phoneno = phoneno;
		this.qualify = qualify;
	}
	public NewStudent() {}
	public String getNewUser() {
		return newUser;
	}
	public void setNewUser(String newUser) {
		this.newUser = newUser;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getQualify() {
		return qualify;
	}
	public void setQualify(String qualify) {
		this.qualify = qualify;
	}
	
	
}
