*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app
${Delay}    1s


*** Keywords ***
Check Title blog  
    Wait Until Page Contains  เข้าสู่ระบบสำเร็จ  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1001.png

Check Title blog2
    Page Should Contain  กรอก E-mail หรือ Username ไม่ถูกต้อง
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1002.png

Check Title blog3
    Page Should Contain  กรอก Password ไม่ถูกต้อง
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1003.png

Check Title blog4
    Page Should Contain  กรอก E-mail หรือ Username ไม่ถูกต้อง
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1004.png

Check Title blog5
    Page Should Contain   Incorrect Password !
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1005.png

Check Title blog6
    Page Should Contain   User Not Exist
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1006.png

*** Test Cases ***
TC1001 การเข้าสู่ระบบ
    Open Browser    ${URL}    ${Browser}

    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    Click Button    id=login-submit-button
    Check Title blog
    Close Browser
TC1002 การเข้าสู่ระบบโดยไม่กรอกชื่อ
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    Click Button    id=login-submit-button
    Check Title blog2
    Close Browser

TC1003 การเข้าสู่ระบบโดยไม่กรอกรหัสผ่าน
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    
    Click Button    id=login-submit-button
    Check Title blog3
    Close Browser

TC1004 การเข้าสู่ระบบโดยไม่กรอกอะไรเลย
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    
    Click Button   id=loginPassword
    
    Click Button    id=login-submit-button
    Check Title blog4
    Close Browser

TC1005 การเข้าสู่ระบบโดยกรอกรหัสผิด
    Open Browser    ${URL}    ${Browser}
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   45643265657 
    Click Button    id=login-submit-button
    sleep    ${Delay}
    Check Title blog5
    Close Browser

TC1006 การเข้าสู่ระบบโดยกรอกชื่อผิด
    Open Browser    ${URL}    ${Browser}
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2frtdreesz
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    Click Button    id=login-submit-button
    sleep    ${Delay}
    Check Title blog6
    Close Browser
