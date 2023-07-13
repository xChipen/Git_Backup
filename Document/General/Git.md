# Git

A工作區	B暫存區[追蹤]	C儲存區

---

## git **add**

1. .
2. aaa.txt

A工作區加至B暫存區

---

## git **branch**
1. **newBranchName**  建立分支
2. **-D** branchName  強迫刪除分支, 不管有無合併過分支
3. **-D** branchName1, branchName2  同時刪除多個分支
4. **-a**  列出所有分支. local 與 remote
5. **-r** 僅列出 remote 分支
6. **-d** 刪除分支, 但必須是已經合併過的分支

---

## git **checkout** xxx

1. ID					  取出指定的ID至 A工作區. 會造成頭部分離的狀態
2. 文件名稱          取消在暫存區中的修改
3. branchName  切換分支
4. **.**                        取消所有暫存區修改
5. master             切換至主分支 master
6. **-b** newBranchName 建立新分支並切換至該分支

---

## git cherry-pick ID

特定 ID 更新

---

## git **commit** 
B暫存區加至C儲存區

1. **-m** "說明"
2. **--amend** -m "新的說明"  修改已經commit的說明. 會產生新的commit 但內容不變. [ --amend 只能處理最後一次 commit ]
3.  儘量不要在**已經 Push 出去之後再修改**，否則可能會造成其它人的困擾。 

---

## git **clean**

1. **-dn**	列出未被追蹤的檔案與資料夾
2. **-df**     強迫刪除未被追蹤的資料

---

## git **init**
初始化建立 git 相關資料

---

## git fetch

抓取遠端分支

git fetch origin

---

## git **log**
顯示歷史紀錄

1. git log **--oneline**  一行顯示

---

## git **ls-files**
暫存區檔案清單

---

## git ls-remote

列出遠端分支

---

## git **merge** 
1. otherBranchName 合併分支, 須先切回master分支
2. --squash branchName  資料會在B暫存區 [ 一樣是fast-forward, 但不會執行快進 ], 須在下指令 **commit **
3. --no-ff branchName  使用 **recursive 合併**, 會自動產生 **commit** 取消: git reset --hard HEAD~**1** 

---

## git pull

git pull origin

git pull origin master

抓取遠端資料

---

## git push

git push -u origin master

git push origin master

將 local : master 推向 remote : origin

2步驟 : git fetch, git merge

---

## git **reflog**

顯示詳細歷史紀錄, 含刪除

---

## git **restore**

1. 文件名稱	取消暫存區

---

## git **reset**

1. 文件名稱	= git checkout 文件名稱	已經 add 至暫存區. 文件修改的還原成未修改
2. **--soft** HEAD~1  退回commit, 暫存區回到工作區
3. **--hard**  HEAD~1  退回commit, 並清除暫存區與工作區. 取回前一次commit的資料
4. --hard **ORIG_HEAD**   ORIG_HEAD 會記錄「危險操作」之前 HEAD 的位置。  

---

## git rebase

git **rebase** master  **先切到其他分支**, 在執行此指令. 會產生**n**個 **commit**

相同基礎下進行合併

合併前

<img src="D:\Git_backup\Document\General\Git_rebase1.png" alt="Git_rebase1" style="zoom:75%;" />

=> 合併後

<img src="D:\Git_backup\Document\General\Git_rebase2.png" alt="Git_rebase2" style="zoom:75%;" />

1. git checkout **cat**
2. git **rebase dog**  以 dog 為基底, 會產生新的 commit
3.  因為 Rebase 指令等於是修改歷史，不應該隨便對已經推出去給別人內容進行 rebase，因為這很容易造成其它人的困擾。 
4. **還原 rebase** [  在 Git 有另一個特別的紀錄點叫做 `ORIG_HEAD`，這個 ORIG_HEAD 會記錄「危險操作」之前 HEAD 的位置。例如分支合併或是 Reset 之類的都算是所謂的「危險操作」。  ]
5. git reset **ORIG_HEAD** --hard
6.  **Rebase 等於是修改歷史**，修改已經推出去的歷史可能會對其它人帶來困擾，所以對於已經推出去的內容，**非必要的話請盡量不要使用 Rebase**。 
7. git rebase **-i** HEAD~~ or ID  -i  互動模式會出現 vim編輯視窗. 順序與 git log 相反 **由舊至新**.
8. 參數 : pick 保留此次commit, 不做修改. **pick 改成 reword [ or r ]**修改 commit 訊息
9. e : edit 會checkout 資料, 修改資料後 **git commit --amend**, 在 **git rebase --continue**
10. s : squash 合併提交, 輸入 some message 產生新的 commit
11. f : fixup
12. x : exec
13. d : drop 刪除這個 commit

---

## git remote

git **remote add origin** https://github.com/xChipen/Git_Backup.git
建立 remote 連線, origin 為 remote 的名稱, URL 是 儲存的位置

---

## git **restore**

1. **--staged** 文件名稱	已經 add 至暫存區. 文件修改的還原成未修改

---

## git show



---

## git stash 暫存資料

1. **stash**  暫存資料
2. **apply**  取出資料  [ 不會刪除暫存紀錄 ]
3. **stash list**  列出目前暫存的資料
4. **stash push -m ''簡短說明'**  加入暫存並說明
5. **stash pop 0**  取出資料並刪除暫存紀錄
6. **stash drop 0**  刪除指定暫存資料
7. **stash clear** 清除所有暫存資料
8. ps. apply or pop 後須有處理, 取消或 add. **連續 apply, pop 是無效**的.

---

## git **status**

檢查檔案狀態,在那一區中

---

## git **switch**

1. **-c** newBranchName	建立新分支並切換至該分支
2. branchName  切換分支

---

## git tag

1. 分2種 :  輕量標籤（lightweight tag），一種是有附註標籤（annotated tag） 
2. 只是一個註記, 通常用於版本更新. 如 : 1.0 
3. git **tag**  列出清單
4. git tag **tagName commitID**  增加一個 tag [ lightweight tag ]
5. git **show tagName**  顯示訊息
6. git tag tagName commitID **-am** "some message"  [ annotated tag ]
7. git **tag -n**  顯示出 tagName and "some message"
8. git **checkout tagName**  取出 commit 資料 [ ps. 頭部分離 ]
9. git tag **-d tagName**  刪除 tag

---

## git --version

目前 git 的 版本

---

## .gitignore

1. test.log  排除的檔案
2. *.log  全部排除
3. **!**test.log  強制不排除
4. **directory/***  排除此目錄的所有檔案

---





---

# 使用場景

## 一般合併 merge

1. git checkout master == git switch master  切回主要分支
2. git merge branchName  選取要合併的分支合併

---

detached 頭部分離及處理方式

1. git checkout xxxID  切換至某一個 ID時. 基本上 HEAD都是指向該分支最後一次 commit 的位置
2. git branch  會顯示  * (HEAD detached at 1d613d9) 表示指到了某一個 ID
3. git add . 接著修改資料
4. git comm -m "xxx"  並提交 commit
5. git checkout master 要在切回主分支時, 會**告知遺失commit. 須建立新分支.**
6. **git branch <new-branch-name> dd10b6c**  建立新分支
7. git branch 就可以看到新分支
8. git checkout master 切回主分支
9. git merge <new-branch-name>  合併剛剛新建立的分支
10. ps. 切換分支資料, 該資料就會消失

---

## 相同功能, 不同指令

1. git **checkout** master == git **switch** master  切換分支
2. git **checkout -b** newBranchName == git **switch -c** newBranchName  建立分支
3. git **checkout . or fileName** == git **restore . or fileName**  已經修改**尚未 git add**, 還原
4. git **reset** two.txt == git **restore --staged** two.txt  == git **checkout .** **已經 git add**, 還原

---

## 工作區刪除檔案如何處理

1. 用工具刪除
2. git **rm** fileName
3. git status  可以顯示  deleted:    two2.txt
4. git **restore . or fileName**  還原刪除
5. git **restore . or fileName**  使用 git add or git rm 還原成未追蹤 [ 未 add 前的狀態 ]

---

## 工作區已經修改存檔, 想要還原

1. 修改後 git status 會顯示 modified:   two2.txt
2. git **checkout . or fileName** == git **restore . or fileName**  還原

---

---

## 工作區新增檔案要刪除, 尚未 git add

1. git **clean -dn**  顯示未被追蹤的檔案
2. git **clean -df**  將檔案刪除
3. 使用工具直接刪除

---

## git add 後還原

git **reset** two.txt == git **restore --staged** two.txt  == git **checkout .**

暫存區退回至未 git add [ **內容不會異動** ]

---

## 撤銷已經 commit

1. git **reset --soft** HEAD~1  退回至已經 git add 但未 commit 的狀態 [ **暫存區** ]
2. git **reset --hard** HEAD~1 退回至最初狀態, 尚未修改.[ 有修改的內容都**會消失** ]
3. git **reset** HEAD~1  退回至未 git add 前的狀態 [ 預設方式 ] [ **有修改的內容不會異動** ]

---

## 已經刪除, 如何取回 ?

1. **git reflog**  查詢到 **ID**
2. **git reset --hard ID**  取回資料並切換 HEAD
3. git branch -D branchName 如何取回
4. git reflog 查詢到 ID
5. git reset --hard ID
6. git switch -c newBranchName 建立新分支, 資料就回取回

---

## fast-forward merge

1. master 未建立新的 commit
2. git switch -c feture
3. git commit -m 'add f1.txt'
4. git commit -m 'add f2.txt'
5. git switch master
6. git merge feture  會產生 fast-forward 快進, master 會有 f1, f2 的 commit
7. git reset --hard **HEAD~2**  因為有 f1, f2 2次 commit
8. git merge **--squash** feture  會產生 fast-forward 快進, master 不會有commit. **f1,f2合併的資料會在暫存區**. 需要另外下 commit [ recursive merge ]
9. git reset --hard **HEAD~1**  取消 1, 因為只有一個 commit
10. --
11. git merge **--no-ff** feature  會有3個commit, f1, f2, Merge branch 'feature'  [ recursive merge ]
12. git reset --hard HEAD~**1**  取消是 HEAD~1, 不是 HEAD~3
13. --
14. git switch master
15. git commit -m 'add m3.txt'  **當master 增加新的 commit**
16. git merge feature  **會自動使用 recursive 合併方式**. 並產生 commit Merge branch 'feature'
17. git reset --hard **HEAD~1**
18. --
19. git merge **--squash** feature  不會有 commit, 將資料存至暫存區
20. git commit -m 'merge feature'  需要再下一個 comm. **優點 : 所有動作都是在 mastre 中處理**

---

## git cherry-pick ID

1. 記錄下某一個 ID
2. git checkout master
3. git cherry-pick ID  更新部分ID的修改

![Git_Cherry-pick](D:\Git_backup\Document\General\Git_Cherry-pick.png)

---

## 衝突處理

1. 不同分支, 修改相同檔案, 相同位置. 並都 各別 commit
2. git checkout master
3. git merge feature  會出現衝突
4. git diff  確認衝突位置, 修改衝突的地方
5. git add .  修改後重新加入暫存區
6. git commit -m "some message"  重新 commit

---

## HEAD

 代表當前分支的最新提交名稱 

1. HEAD~1  ==  HEAD^

---

## git workflow 分支運用

![Git](D:\Git_backup\Document\General\Git.png)

1.  主要分支有兩種： master 分支和 develop 分支。 
2.  Feature分支  是新功能的開發或修復錯誤的時候從 develop 分支分開出來的。 
3.  Release分支是為了發布而準備的。通常這種分支的名稱最前面會加上"release-" 。 
4.  Hot fix分支是在發布的產品需要緊急修改時，從 master 分支建立的分支。通常會在分支名稱的最前面會加上"hotfix-"。 

---

## 分支退送到遠端

1. git checkout -b feature  建立分支
2. git push origin feature  分支退送至遠端

---

## 抓取遠端分支

1. git ls-remote  列出遠端分支
2. git fetch origin  抓取遠端分支

---

## 建立遠端連線

1. git remote add origin xxxURL
2. git push -u origin master

---

## 複製遠端 資料

**1. remote 無資料, local 已經有資料**

1. git **remote add origin xxxURL.git**
2. git **push -u origin master**  更新 remote, 使用 -u **因為 remote 連 master 都沒有**
3. git pull  取回遠端資料
4. git push  更新資料
5. git branch -v  檢視資料 * master f0eea2a m1.txt add 789 => local remote 最後commit message
6. git branch -vv 檢視資料  * master f0eea2a [origin/master] m1.txt add 789  多了remote branch資訊
7. git remote show origin  檢視詳細資料

---

**2. remote 已經有資料 [ **在GitHub上直接建立** ]**

1. git **clone xxxURL**  會自行建立新資料夾 [ Repository Name ]
2. git branch -vv  * main cd757ec [origin/main] Initial commit  [ 預設名稱是 **main 非 master** ]
3. git push  可以直接使用, 不用加 -u
4. git pull  

---

**3. remote 已經有資料, local無資料**

1. git remote add origin xxxURL.git
2. git **fetch origin**  建立遠端追蹤
3. git branch -av    檢視 remotes/origin/main 569b1d4 add m1.txt
4. git **branch --track main origin/main**  建立本地追蹤
5. git checkout main
6. git add .
7. git commit -m "xxx"
8. git push

---

**4. remote已經有資料, local 已經有資料**

1. git init
2. git add .
3. git commit -m "xxx"
4. git **remote add origin xxxURL.git**
5. git **pull origin**  取得遠端追蹤
6. git **branch -m master main**  將 master 更名 main [ 因為本地端 master, 遠端是 main. 不更名後續會失敗 ]
7. git pull origin main  因為不同歷史資料 fatal: refusing to merge unrelated histories
8. git **pull origin main --allow-unrelated-histories**
9. git push

---

1. 建立遠端分支, 本地端已經有分支 dog
2. git push -u origin dog  建立遠端分支

---

## 刪除分支

1. git checkout master
2. git **branch -D dog**  **刪除本地分支**
3. git **branch -av**  檢視遠端分支還會存在
4. git **branch --track dog origin/dog**  可以加回本地追蹤
5. git **branch --delete --remote origin/dog**  **刪除遠端的追蹤**
6. git **fetch origin**  加回遠端追蹤
7. git branch --track dog origin/dog  加回本地端追蹤
8. git **push origin --delete dog**  **刪除遠端分支**

---













