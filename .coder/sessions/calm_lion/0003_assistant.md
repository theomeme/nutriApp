O erro indica que o branch `main` no repositório remoto já possui commits e o branch local está atrás dele. Para resolver isso, você precisa sincronizar o branch local com o remoto antes de fazer o push. Aqui estão os passos:

1. **Faça o pull para sincronizar com o repositório remoto**:
   ```bash
   git pull origin main --rebase
   ```

   Isso irá baixar as alterações do repositório remoto e aplicar os commits locais por cima (rebase).

2. **Resolva conflitos, se houver**:
   Caso existam conflitos, o Git irá pedir para você resolvê-los manualmente. Após resolver os conflitos, finalize o rebase com:
   ```bash
   git rebase --continue
   ```

3. **Faça o push novamente**:
   Após sincronizar e resolver os conflitos, você pode fazer o push:
   ```bash
   git push origin main
   ```

Se precisar de mais ajuda com conflitos ou outros comandos, é só perguntar!