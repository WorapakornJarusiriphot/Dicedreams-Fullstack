*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}    https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
loginStore
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  outcast
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    Click Button    locator
    Click Button    locator
    Click Button    locator
    Click Button    locator
    Click Button   id=name_activity
    Input Text      name=name_activity  Board Game Night
    Click Button   id=status_post
    Input Text      name=status_post  active
    Click Button   id=creation_date
    Input Text      name=creation_date  07/13/2024 02:50:00
    Click Button   id=detail_post
    Input Text      name=detail_post  มาร่วมสนุกกับเกมกระดานยามค่ำคืนกับเรา
    Click Button   id=date_activity
    Input Text      name=date_activity  07/13/2024
    Click Button   id=time_activity
    Input Text      name=time_activity  18:00:00
    Click Button   id=post_activity_image
    Input Text      name=post_activity_image  1cd2498d-07fa-4ea5-83ef-c71781bc8cdf.jpeg
    Click Button     -
    Page Should Contain    คุณได้ทำการสร้างโพสต์กิจกรรมสำเร็จแล้ว
    Capture Page Screenshot    
    Close Browser