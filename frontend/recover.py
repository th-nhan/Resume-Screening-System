import json
import os
import re

log_file = r'C:\Users\thanh nhan\.gemini\antigravity\brain\a4addd73-46df-4a94-892f-28557892c618\.system_generated\logs\overview.txt'

with open(log_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

def find_last_view_of(filename):
    print(f"Searching for {filename}")
    for line in reversed(lines):
        if 'File Path' in line and filename in line and '"type":"TOOL_RESPONSE"' in line:
            data = json.loads(line)
            output = data.get('output', '')
            if output and 'Total Lines:' in output:
                lines_list = output.split('\n')
                code_lines = []
                for cl in lines_list:
                    # Match <line_number>: <code...>
                    match = re.match(r'^\d+:\s(.*)', cl)
                    if match:
                        code_lines.append(match.group(1))
                    elif cl.startswith('The above content does NOT show'):
                        continue
                    elif cl.startswith('The above content shows the entire'):
                        continue
                if len(code_lines) > 20: # Make sure it's a substantive view
                    print(f"Found {filename} with {len(code_lines)} lines")
                    return '\n'.join(code_lines)
    return None

app_code = find_last_view_of('App.jsx')
dashboard_code = find_last_view_of('CVScreenerDashboard.jsx')
upload_code = find_last_view_of('CVUploadForm.jsx')

if dashboard_code:
    with open('u:/python/FILTER_CV_AI/frontend/src/components/CVScreenerDashboard.jsx', 'w', encoding='utf-8') as f:
        f.write(dashboard_code)
    print("Recovered CVScreenerDashboard.jsx")

if upload_code:
    with open('u:/python/FILTER_CV_AI/frontend/src/components/CVUploadForm.jsx', 'w', encoding='utf-8') as f:
        f.write(upload_code)
    print("Recovered CVUploadForm.jsx")

if app_code:
    with open('u:/python/FILTER_CV_AI/frontend/src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(app_code)
    print("Recovered App.jsx")

