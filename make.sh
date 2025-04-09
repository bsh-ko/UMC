#!/bin/bash

WEEK_FOLDER=$1   # 예: week04
PROJECT_NAME=$2  # 예: 실습

TEMPLATE_DIR="my-vite-template"
TARGET_DIR="$WEEK_FOLDER/$PROJECT_NAME"

# 인자 확인
if [ -z "$WEEK_FOLDER" ] || [ -z "$PROJECT_NAME" ]; then
  echo "❗ 사용법: ./make-project.sh <주차폴더> <프로젝트이름>"
  echo "예: ./make-project.sh week04 실습"
  exit 1
fi

# 주차 폴더가 없으면 생성
mkdir -p "$WEEK_FOLDER"

# 템플릿 복사 (rsync 말고 cp 사용)
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# 복사된 폴더로 이동
cd "$TARGET_DIR" || exit

# Git 초기화
rm -rf .git
git init
git add .
git commit -m "🎉 템플릿 기반 $PROJECT_NAME 초기 세팅"

# 패키지 설치
pnpm install

echo "✅ '$TARGET_DIR' 프로젝트 생성 완료!"
