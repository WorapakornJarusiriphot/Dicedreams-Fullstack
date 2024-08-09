*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${Delay}    1s



*** Keywords ***



*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    
    Click Button    xpath=(//button[@type='button'])[3]
    sleep    ${Delay}
    Click Button   xpath=//div[@id='root']/div/main/div/div/div[2]/div
    Input Text      id=first_name    nawaporn
    Click Button   id=last_name
    Input Text      id=last_name    boongon
    Click Button   css=.MuiFormControl-root:nth-child(3)
    Input Text      id=username    dream1
    Click Button  css=.MuiFormControl-root:nth-child(4)
    Input Text      id=phone_number   0987654321
    Click Button   xpath=//div[@id='root']/div/main/div/div/div[2]/div[5]
    Input Text      id=email   nawaporn@gmail.com
    Click Button   xpath=//div[@id='root']/div/main/div/div/div[2]/div[6]
    Input Text      id=password  D12345678
    Click Button   css=.MuiFormControl-root:nth-child(7) path
    Click Button   xpath=(//input[@name='gender'])[3]
    Click Button   xpath=//div[@id='root']/div/main/div/div/div/form/span
    Input Text      css=input:nth-child(7)   C:\fakepath\สีเหลือง สีฟ้า ภาพประกอบ น่ารัก Desktop Wallpaper.png
    sleep    ${Delay}
    Click Button    xpath=//div[@id='root']/div/main/div/div/div[2]/div[3]/button
    sleep    ${Delay}
    Capture Page Screenshot
    Close Browser