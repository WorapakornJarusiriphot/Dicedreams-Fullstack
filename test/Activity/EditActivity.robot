*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}    https://dicedreams-font-end.vercel.app/
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
    Wait Until Page Contains    Changes saved successfully!
    Sleep    1


*** Test Cases ***
TC1701Edit
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}

    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Button    id=":r1q:"
    Input Text    id=":r1q:"    นัดแข่งเกมหมากรุก
    Click Button    id="outlined-required"
    Input Text    id="outlined-required"    มาร่วมสนุกพร้อมลุ้นรับรางวัลพิเศษ
    #วัน
    Click Button    xpath=//*[@id=":r1s:"]
    Input Text    xpath=//*[@id=":r1s:"]    12/11/67
    #เวลา
    Click Element    id=":r1u:"
    Input Text    id=":r1u:"    18.00
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/หมากรุก.jpeg 





    
