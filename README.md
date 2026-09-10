# 한국경제 AI 교육 포트폴리오

`dist/article.html`을 브라우저에서 열면 시작됩니다. 모든 페이지는 개별 HTML이며 같은 폴더의 스타일과 이미지 파일을 사용합니다.

- article.html: 기사 목록과 펼쳐 읽기
- image.html: 이미지 갤러리와 확대 보기
- video.html: 영상 소개와 스토리보드
- final.html: 최종 프로젝트 소개
- index.html: 첫 진입용 기사 페이지

현재 콘텐츠는 예시입니다. 실제 파일 업로드 서버나 관리 기능은 포함하지 않습니다. 기사와 프로젝트는 각 HTML에서 문구를 수정하고, 이미지는 assets 폴더에 넣은 뒤 경로를 변경하세요. 영상 업로드 후 video.html의 기획 영역을 `<video controls src="assets/파일명.mp4"></video>`로 교체할 수 있습니다.

HTML은 직접 수정할 수 있습니다. create-pages.mjs는 초기 생성용이므로 HTML을 직접 수정한 뒤 재실행하면 수정이 덮어써집니다. 외부 Google Fonts에 연결되지 않아도 기본 글꼴로 동작합니다.
