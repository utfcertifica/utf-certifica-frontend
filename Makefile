docker-build:
	pnpm build
	docker build -t certifica-utf ./

docker-tag:
	docker tag certifica-utf registry.com.br/utfpr/certifica-utf

docker-push:
	docker push registry.com.br/utfpr/certifica-utf

docker-all: docker-build docker-tag docker-push

start:
	yarn start

kube-rollout:
	kubectl rollout restart deployment certifica-utf -n certifica
