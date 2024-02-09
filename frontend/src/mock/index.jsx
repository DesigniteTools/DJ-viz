export const data = {
  MethodMetrics: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.PasswordManager",
      "Type Name": "PasswordEncodeDecodeTest",
      "Method Name": "testEncrypt",
      LOC: "3",
      CC: "1",
      PC: "0",
      "Line no": "14",
      IsTest: "1",
      "Main prod class tested": "com.csci5308.medinteract.PasswordManager.PasswordEncodeDecode",
      "Production classes tested": "com.csci5308.medinteract.PasswordManager.PasswordEncodeDecode"
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.PasswordManager",
      "Type Name": "PasswordEncodeDecodeTest",
      "Method Name": "testDecrypt",
      LOC: "3",
      CC: "1",
      PC: "0",
      "Line no": "19",
      IsTest: "1",
      "Main prod class tested": "com.csci5308.medinteract.PasswordManager.PasswordEncodeDecode",
      "Production classes tested": "com.csci5308.medinteract.PasswordManager.PasswordEncodeDecode"
    }
  ],
  ArchitectureSmells: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.appointment.controller",
      "Architecture Smell": "Scattered Functionality",
      "Cause of the Smell":
        "The tool detected the smell in this component because a set of two or more components realizes the same high-level architectural concern. Following components realize the same concern: com.csci5308.medinteract.doctor.model; com.csci5308.medinteract.patient.model; com.csci5308.medinteract.appointment.service; com.csci5308.medinteract.doctor.service; com.csci5308.medinteract.patient.service."
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.appointment.controller",
      "Architecture Smell": "Scattered Functionality",
      "Cause of the Smell":
        "The tool detected the smell in this component because a set of two or more components realizes the same high-level architectural concern. Following components realize the same concern: com.csci5308.medinteract.patient.model; com.csci5308.medinteract.appointment.service; com.csci5308.medinteract.doctor.service; com.csci5308.medinteract.patient.service."
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.appointment.controller",
      "Architecture Smell": "Scattered Functionality",
      "Cause of the Smell":
        "The tool detected the smell in this component because a set of two or more components realizes the same high-level architectural concern. Following components realize the same concern: com.csci5308.medinteract.doctor.service; com.csci5308.medinteract.appointment.model; com.csci5308.medinteract.patient.service; com.csci5308.medinteract.Response; com.csci5308.medinteract.appointment.service; com.csci5308.medinteract.doctor.model; com.csci5308.medinteract.notification.service; com.csci5308.medinteract.patient.model."
    }
  ],
  ImplementationSmells: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTControllerTest",
      "Method Name": "testValidateJWTTokenTrue",
      "Implementation Smell": "Long Statement",
      "Cause of the Smell":
        'The length of the statement "MockHttpServletRequestBuilder contentTypeResult=MockMvcRequestBuilders.post("/jwt/validateJWTToken").contentType(MediaType.APPLICATION_JSON);" is 141.',
      "Method start line no": "29"
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTControllerTest",
      "Method Name": "testValidateJWTTokenTrue",
      "Implementation Smell": "Long Statement",
      "Cause of the Smell":
        'The length of the statement "MockMvcBuilders.standaloneSetup(jWTController).build().perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk()).andExpect(MockMvcResultMatchers.content().contentType("application/json")).andExpect(MockMvcResultMatchers.content().string("{\\"msg\\":\\"Token is Valid\\"`\\"isError\\":false`\\"data\\":{}}"));" is 315.',
      "Method start line no": "29"
    }
  ],
  DesignSmells: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTController",
      "Design Smell": "Feature Envy",
      "Cause of the Smell":
        "The tool detected a instance of this smell because validateJWTToken is more interested in members of the type: JWT"
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWT",
      "Design Smell": "Deficient Encapsulation",
      "Cause of the Smell":
        "The tool detected the smell in this class because the class exposes fields belonging to it with public accessibility. Following fields are declared with public accessiblity: SECRET_KEY; MINUTES; MILLISECONDS; SECONDS"
    }
  ],
  TypeMetrics: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.PasswordManager",
      "Type Name": "PasswordEncodeDecodeTest",
      NOF: "2",
      NOPF: "0",
      NOM: "3",
      NOPM: "1",
      LOC: "15",
      WMC: "3",
      NC: "0",
      DIT: "0",
      LCOM: "1.0",
      FANIN: "0",
      FANOUT: "1",
      "File path":
        "/Applications/XAMPP/xamppfiles/htdocs/group27/src/test/java/com/csci5308/medinteract/PasswordManager/PasswordEncodeDecodeTest.java",
      "Line no": "9"
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.PasswordManager",
      "Type Name": "PasswordEncodeDecode",
      NOF: "2",
      NOPF: "0",
      NOM: "3",
      NOPM: "3",
      LOC: "23",
      WMC: "3",
      NC: "0",
      DIT: "0",
      LCOM: "0.0",
      FANIN: "4",
      FANOUT: "0",
      "File path":
        "/Applications/XAMPP/xamppfiles/htdocs/group27/src/main/java/com/csci5308/medinteract/PasswordManager/PasswordEncodeDecode.java",
      "Line no": "10"
    }
  ],
  TestabilitySmells: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.PasswordManager",
      "Type Name": "PasswordEncodeDecodeTest",
      "Testability Smell": "Hard-wired Dependency",
      "Cause of the Smell":
        "The tool detected the smell in this class because the class creates objects of concrete classes and uses them. Following concrete classes are instantiated and used: com.csci5308.medinteract.PasswordManager.PasswordEncodeDecode"
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTController",
      "Testability Smell": "Hard-wired Dependency",
      "Cause of the Smell":
        "The tool detected the smell in this class because the class creates objects of concrete classes and uses them. Following concrete classes are instantiated and used: com.csci5308.medinteract.Response.Response"
    }
  ],
  TestSmells: [
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTControllerTest",
      "Method Name": "testValidateJWTTokenTrue",
      "Test Smell": "Missing assertion",
      "Cause of the Smell":
        "The tool detected the smell in this test method because the test doesn't have any assertion."
    },
    {
      "Project Name": "group27",
      "Package Name": "com.csci5308.medinteract.JWT",
      "Type Name": "JWTControllerTest",
      "Method Name": "testValidateJWTTokenFalse",
      "Test Smell": "Missing assertion",
      "Cause of the Smell":
        "The tool detected the smell in this test method because the test doesn't have any assertion."
    }
  ]
};
