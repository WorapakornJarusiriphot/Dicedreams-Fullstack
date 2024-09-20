*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
login check1
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  WOJA2
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
TC13.2ลบโพสต์นัดเล่น
    Open Browser    ${URL}    ${Browser}
    login check1
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="MoreVertOutlinedIcon"]/svg    timeout=30s

    # ลองใช้การคลิกแบบ JavaScript ถ้า element ไม่สามารถคลิกได้
    Scroll Element Into View    xpath=//*[@id="MoreVertOutlinedIcon"]/svg

    # หรือใช้คำสั่ง Click Element ปกติ
    Click Element    xpath=//*[@id="MoreVertOutlinedIcon"]/svg
    Run Keyword If    xpath=//*[@id="MoreVertOutlinedIcon"]/svg is False    Execute JavaScript    document.querySelector('//*[@id="MoreVertOutlinedIcon"]/svg').click()
    #Page Should Contain    โพสต์นัดนี้ได้ถูกลบเป็นที่เรียบร้อยแล้ว
    #Capture Page Screenshot  Photo/Viwearticle/TC13
    Close Browser