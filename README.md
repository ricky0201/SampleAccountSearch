# 取引先検索画面（サンプル）

よくある取引先の検索画面を Lightning Web Component で作るとこんな感じで出来る、というサンプルです。

## スクラッチ組織で試す

1. 環境をセットアップします。 [Quick Start: Lightning Web Components Trailhead](https://trailhead.salesforce.com/ja/content/learn/projects/quick-start-lightning-web-components) プロジェクトのステップに従います。  
   このステップには以下が含まれます:
* Trailhead Playground で、Dev Hub を有効化する
* Salesforce CLI のインストール
* Visual Studio Code のインストール
* Lightning Web Components Extensionを含む、Visual Studio Code Salesforce Extensions のインストール

2. まだ実施していない場合にはHub組織に認証しエイリアスを設定します。(以下の例では myhuborg と設定)
   ```
   sfdx force:auth:web:login -d -a myhuborg
   ```
3. SampleAccountSearch リポジトリを Clone します。
   ```
   git clone https://github.com/FSI-SalesforceTech/SampleAccountSearch.git
   cd SampleAccountSearch
   ```
4. スクラッチ組織を生成し、エイリアスを設定します。（以下の例では sampleAccountSearch と設定）
   ```
   sfdx force:org:create -s -f config/project-scratch-def.json -a sampleAccountSearch
   ```
5. アプリをスクラッチ組織に Push します。
   ```
   sfdx force:source:push
   ```
6. 権限セットをデフォルトユーザにアサインします。
   ```
   sfdx force:user:permset:assign -n permsetSearchAccount
   ```
7. サンプルデータをロードします。
   ```
   sfdx force:data:tree:import --sobjecttreefiles data/Account.json
   ```
8. スクラッチ組織を開きます。
   ```
   sfdx fouce:org:open
   ```
9. 「取引先検索」タブを開きます。
