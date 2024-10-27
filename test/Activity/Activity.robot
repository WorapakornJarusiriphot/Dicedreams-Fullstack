*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
loginStore
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier   Outcast
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111
    Click Button    id=login-submit-button

Check Title blog
    Wait Until Page Contains    File uploaded and activity saved successfully.
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1601.png

Check Title blog1
    Wait Until Page Contains    Please fill all fields and select a file before saving.
    Sleep    1


*** Test Cases ***
TC1601สร้างโพสต์กิจกรรม 
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Click Button    id=":r1q:"
    Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    Input Text    id="outlined-required"    มาร่วมสนุกพร้อมลุ้นรับรางวัลพิเศษ
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/07/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 
    Check Title blog


TC1602สร้างโพสต์กิจกรรมไม่กรอกชื่อกิจกรรม
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Click Button    id=":r1q:"
    #Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    Input Text    id="outlined-required"    มาร่วมสนุกพร้อมลุ้นรับรางวัลพิเศษ
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/07/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 
    Capture Page Screenshot  Photo/Viwearticle/TC1602.png
    Check Title blog1

TC1603สร้างโพสต์กิจกรรมไม่กรอกรายละเอียด 
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Click Button    id=":r1q:"
    Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/07/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 
    Capture Page Screenshot  Photo/Viwearticle/TC1603.png
    Check Title blog1

TC1604สร้างโพสต์กิจกรรมไม่เลือกวัน
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Click Button    id=":r1q:"
    #Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    Input Text    id="outlined-required"    มาร่วมสนุกพร้อมลุ้นรับรางวัลพิเศษ
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/07/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 
    Capture Page Screenshot  Photo/Viwearticle/TC1604.png
    Check Title blog1

TC1605สร้างโพสต์กิจกรรมไม่เลือกเวลา
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Click Button    id=":r1q:"
    #Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    Input Text    id="outlined-required"    มาร่วมสนุกพร้อมลุ้นรับรางวัลพิเศษ
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/07/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 
    Capture Page Screenshot  Photo/Viwearticle/TC1605.png
    Check Title blog1