Contents
========

[EXECUTIVE SUMMARY 1](#executive-summary)

[USECASE BACKGROUND 1](#usecase-background)

[OBJECTIVE 2](#objective)

[BUILDING THE ERP CLOUD PO EVENT USE CASE
2](#building-the-erp-cloud-po-event-use-case)

[Prerequisites 2](#prerequisites)

[Import VBCS Web Application 3](#import-vbcs-web-application)

[Creating Connections (Flow1) 4](#creating-connections-flow1)

[Creating REST Connection 4](#creating-rest-connection)

[Creating the PO Event Integration (Flow1)
7](#creating-the-po-event-integration-flow1)

[Activate Integration (Flow1) 31](#activate-integration-flow1)

[Testing the ERP Event Flow Integration (Flow1)
32](#testing-the-erp-event-flow-integration-flow1)

[Creating Connections (Flow2) 38](#creating-connections-flow2)

[Creating the PO Proxy Integration (Flow2)
38](#creating-the-po-proxy-integration-flow2)

[Activate Integration (Flow2) 48](#activate-integration-flow2)

[Invoke ERP Cloud Service from VBCS Web App
49](#invoke-erp-cloud-service-from-vbcs-web-app)

[Running the VBCS Web App 56](#running-the-vbcs-web-app)

EXECUTIVE SUMMARY
=================

Oracle Integration provides native connectivity to Oracle and non-Oracle
Software as a Service (SaaS) and On-premises applications, such as
Oracle ERP Cloud, Oracle Service Cloud, HCM Cloud, Salesforce.com,
Workday, EBS, SAP, NetSuite and so on. Oracle Integration adapters
simplify connectivity by handling the underlying complexities of
connecting to applications using industry-wide best practices. You only
need to create a connection that provides minimal connectivity
information for each system.

USECASE BACKGROUND
==================

This use case explores the use of Oracle Integration to subscribe to
Oracle ERP Cloud Events and push the relevant event information to
downstream systems. As part of the lab you would be building the below
use case scenario.

1.  User creates a Purchase Order(PO) in ERP Cloud and a PO event is
    raised (Flow1)

2.  Oracle Integration subscribes to the PO event, transforms and pushes
    the relevant information to a custom table (VBCS) (Flow1)

3.  User attaches Letter of Credit (LOC) information to the PO record
    from the VBCS Web App. (Flow2)

4.  PO Record in ERP Cloud is updated with the LOC information in ERP
    cloud (Flow2)

The following diagram illustrates the proposed interaction between the
systems involved in this use case. There 2 flows to complete this use
case.

|                                                                   |
|-------------------------------------------------------------------|
| <img src="media/image1.png" style="width:7in;height:3.59444in" /> |

OBJECTIVE
=========

This document walks you through the steps needed to replicate this use
case in your environment

BUILDING THE ERP CLOUD PO EVENT USE CASE
========================================

This section works through the steps that are required to build the
integration from scratch.

Prerequisites
-------------

You will need access to the following applications and artifacts:

-   Oracle Integration (OIC)

-   ERP Cloud R12+

-   VBCS App to import (LetterOfCreditPortal.zip)

Import VBCS Web Application
---------------------------

1.  Login to Oracle Integration homepage and Click on Visual Builder

2.  Select Import -\> Application from file and Upload the
    “LetterOfCreditPortal.zip” from the Lab artifacts

    Note: Since there are multiple attendees sharing a single
    environment, please use the

    \<ClassID\> \<StudentID\> information (will be provided to you by
    the instructor) as a suffix to your web application

    E.g. If your \<ClassID\> is 96 and your \<StudentID\> is 06, then
    you will name your web application as **LetterOfCreditPortal9606**

3.  Change the ApplicationId also to the same name
    (**LetterOfCreditPortal9606)** to avoid conflicts and Select
    **Import**

> <img src="media/image2.png" style="width:7.02454in;height:4.91439in" />

1.  Confirm that your application is imported into VBCS. Open the
    Imported application and you would notice that a few pages and
    business objects relevant to the use case is pre created. We will
    use this web application in the later part of the lab.

> Select the imported Web Application and you will observe a few pages
> are pre created
>
> <img src="media/image3.png" style="width:7in;height:3.59375in" />

1.  Couple of Business Objects (PO and LOC) pre created

> <img src="media/image4.png" style="width:7in;height:3.42917in" />
>
> Click the PO Business Object, copy the Data endpoint as highlighted
> above, and save it for later use.

Creating Connections (Flow1)
----------------------------

The following Connections have been created and configured. You will be
using these connections for creating Integration flows

| Connection Name | Connection Type |
|-----------------|-----------------|
| ERP Conn 96 06  | ERP Adapter     |

### Creating REST Connection

1.  On the Oracle Integration home page, click Integrations

2.  Select the Designer-\>Connections tab

3.  Click on Create and search for REST Adapter by providing the search
    keyword “REST” and Select Create

    <img src="media/image5.png" style="width:5.71779in;height:3.64339in" />

4.  Provide following details and click on Create

<table>
<thead>
<tr class="header">
<th><strong>Field</strong></th>
<th><strong>Enter</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Name</td>
<td><p>VBCS REST Con &lt;ClassId&gt;&lt;StudentId&gt;</p>
<p>Eg: VBCS REST Con 96 06</p></td>
</tr>
<tr class="even">
<td>Identifier</td>
<td><p>Nothing to enter. The value is automatically generated from the integration name: VBCS_REST_CON_&lt;ClassId&gt;_&lt;StudentId&gt;</p>
<p>Eg: VBCS_REST_CON_96_06</p></td>
</tr>
<tr class="odd">
<td>Role</td>
<td>Invoke</td>
</tr>
</tbody>
</table>

<img src="media/image6.png" style="width:3.79755in;height:2.39381in" />

1.  Configure Connectivity and Security Property Values as per below
    table and Click “OK”

<table>
<thead>
<tr class="header">
<th><strong>Field</strong></th>
<th><strong>Enter</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Configure Connectivity</td>
<td></td>
</tr>
<tr class="even">
<td>Connection type</td>
<td>REST API Base URL</td>
</tr>
<tr class="odd">
<td>Connection URL</td>
<td><p>Use the Data endpoint url copied from “Import VBCS App” Section” -&gt; Step 5</p>
<p>Provide the endpoint till “/data “</p>
<p>Ex: https://&lt;oichost&gt;/ic/builder/design/LetterOfCreditPortal9606/1.0/resources/data</p></td>
</tr>
<tr class="even">
<td>Configure Security</td>
<td></td>
</tr>
<tr class="odd">
<td>Security Policy</td>
<td>Basic Authentication</td>
</tr>
<tr class="even">
<td>Username</td>
<td>Use the same credentials as used for login into Oracle Integration console</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>Use the same credentials as used for login into Oracle Integration console</td>
</tr>
</tbody>
</table>

<img src="media/image7.png" style="width:6.15337in;height:2.73178in" />

<img src="media/image8.png" style="width:5.79755in;height:2.75441in" />

Save and Test the connection

<img src="media/image9.png" style="width:7in;height:0.68472in" />

Creating the PO Event Integration (Flow1)
-----------------------------------------

1.  On the Oracle Integration home page, click **Integrations**.

2.  On the Integrations page, click **Create**. The Create Integration -
    Select a Style/Pattern dialog is displayed.

3.  Select **App Driven Orchestration** type of integration. The
    **Create New** Integration dialog is displayed.

4.  Enter the following information:

<table>
<thead>
<tr class="header">
<th>Field Element</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>What do you want to call your integration?</td>
<td><p>ERP PO Event VBCS &lt;ClassId&gt; &lt;StudentId&gt;</p>
<p>Ex: ERP PO Event VBCS 96 06</p></td>
</tr>
<tr class="even">
<td>Identifier</td>
<td>Accept the default identifier value. The identifier is the same as the integration name you provided, but in upper case.</td>
</tr>
<tr class="odd">
<td>Version</td>
<td>Accept the default version number of 01.00.0000. Alternatively, if you want to change the version number, enter the version using numbers only in this format: xx.xx.xxxx.</td>
</tr>
<tr class="even">
<td>What does this integration do?</td>
<td>This integration demonstrates the use of Oracle Integration ERP Cloud Adapter Eventing capability along with the REST adapter to store the PO record in VBCS PO Table</td>
</tr>
<tr class="odd">
<td>Which package does this integration belong to?</td>
<td><em>Leave blank</em></td>
</tr>
</tbody>
</table>

<img src="media/image10.png" style="width:4.44277in;height:4.56442in" />

<img src="media/image11.png" style="width:7in;height:4.73472in" />

1.  Click **Create**. The integration canvas is displayed.

<img src="media/image12.png" style="width:7in;height:2.84861in" />

<img src="media/image13.png" style="width:7in;height:2.78819in" />

1.  Hover over the circle next to Start, and click on the + sign

2.  Select the ERP Connection (ERP conn 96 06) from the list which is
    pre created for you

3.  Enter details as in the screenshot below to define the endpoint in
    the flow

<img src="media/image14.png" style="width:7in;height:3.69028in" />

4.	In the next screen, select “Receive Business Events raised within ERP Cloud” as the option and search           for the “Purchase Order Event” and provide an XPath Expression as below and Click Next

    ```xml 
    <xpathExpr xmlns:ns0="http://xmlns.oracle.com/apps/prc/po/editDocument/purchaseOrderServiceV2/" xmlns:ns2="http://xmlns.oracle.com/apps/prc/po/editDocument/purchaseOrderServiceV2/types/"\>$eventPayload/ns2:result ns0:Value/ns0:PurchaseOrderLine/ns0:ItemDescription="Lan
    Cable"\</xpathExpr\>
    ```

Note: Change the highlighted value to some Item Description of your
choice to filter the PO Record that you would be creating in ERP Cloud
later. This is important as to filter your PO because multiple Users
would be creating PO Event flows.

<img src="media/image15.png" style="width:7in;height:5.09236in" />

1.  Select the Response type as “None” and Click Next

    <img src="media/image16.png" style="width:7in;height:3.01181in" />

2.  Review summary page and Click Done

    <img src="media/image17.png" style="width:6.22517in;height:3.34356in" />

3.  Integration so far

> <img src="media/image18.png" style="width:5.93252in;height:2.22822in" />

1.  Next we will add the Invoke Action Using the REST connection
    created earlier to verify if the PO exists in VBCS PO table. Hover
    on the wiring next to the “POEVENT” and click on “+” sign and Select
    the REST Connection (VBCS\_REST\_CON\_\<ClassId\>\_\<StudentId\>)

    <img src="media/image19.png" style="width:5.30675in;height:2.43489in" />

2.  In the “Basic Info” page provide the details as per the screenshot
    below and Click Next

    <img src="media/image20.png" style="width:7in;height:5.22083in" />

3.  In the Request Parameters page Add a query parameter as per below
    and Click Next. We wanted to search for a PO which can be invoked
    using below query parameter format

    Ex:
    https://\<oid\_host\>/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO?q=pOHeaderId=300000074157561

    <img src="media/image21.png" style="width:4.57055in;height:2.39818in" />

4.  In the Response page Select the Response payload format as JSON

    <img src="media/image22.png" style="width:5.09202in;height:3.23606in" />

    Select “inline” and enter the below JSON sample in the text area and
    Click OK. Select Next

    ```

    {
        "items": \[
    {
        "id": 24,
        "creationDate": "2019-01-13T23:12:09+00:00",
        "lastUpdateDate": "2019-01-13T23:12:09.027+00:00",
        "createdBy": "john.doe@example.com",
        "lastUpdatedBy": "john.doe@example.com",
        "pOHeaderId": "300000074157561",
        "orderNumber": "162180",
        "procurementBUId": "300000046987012",
        "procurementBusinessUnit": "US1 Business Unit",
        "supplierId": "300000047414679",
        "supplier": "Dell Inc.",
        "soldToLegalEntity": "US1 Legal Entity",
        "lOCId": null,
        "links": \[
    {
        "rel": "self",
        "href": "https://oic\_host/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/24",
        "name": "PO",
        "kind": "item",
        "properties": {"changeIndicator":
        "ACED0005737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000001770400000001737200106A6176612E6C616E672E446F75626C6580B3C24A296BFB0402000144000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B02000078703FF000000000000078"}
        },
    {
        "rel": "canonical",
        "href":
        "https://oic\_host/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/24",
        "name": "PO",
        "kind": "item"
    }
    \]
    }
    \],
        "count": 1,
        "hasMore": false,
        "limit": 25,
        "offset": 0,
        "links": \[
    {
        "rel": "self",
        "href":
        "https://oic\_host/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO",
        "name": "PO",
        "kind": "collection"
    }

    \]

    }

    ```

5.  In the Summary page review the information and click Done

    <img src="media/image23.png" style="width:5.11866in;height:2.86503in" />

6.  Integration so far…

    <img src="media/image24.png" style="width:5.32515in;height:2.36938in" />

7.  A Map Action (Map to GETPO) is created automatically. Perform the
    mapping as per below. Select the Map Action and Click on “Edit” to
    open the Mapper

Select the “q” Query Parameter from the Target, drag and drop the concat
function to build query parameter value as “pOHeaderId=300000074157561”.

<img src="media/image25.png" style="width:7in;height:2.89097in" />

Provide static value “pOHeaderId” as the first parameter value for the
concat(“”,””,””)

Provide static value “=” as the second parameter value for the
concat(“”,””,””)

<img src="media/image26.png" style="width:7in;height:2.98958in" />

Provide the third parameter value by dragging the “POHeaderId” element
inside the concat(“”,””,””)

<img src="media/image27.png" style="width:7in;height:2.82292in" />

Click on the Tick mark in the expression window to save your expression

<img src="media/image28.png" style="width:7in;height:2.88542in" />

Click on Validate to check for any errors.

<img src="media/image29.png" style="width:7in;height:2.19167in" />

Save your integration

1.  Now, we will assign PO Record Count value to a variable “POHeaderId”

    Hover on the wiring next to “GETPO” and click on “+” sign and Select
    Assign Action

    <img src="media/image30.png" style="width:3.40491in;height:2.14158in" />

    Provide a name for the Assign Action and Click on Create

    <img src="media/image31.png" style="width:3.45399in;height:2.11112in" />

    Click on “+” to add a new Variable. Add a variable “PORecordCount”
    of Data type string

    <img src="media/image32.png" style="width:7in;height:1.65556in" />

    Click the pencil icon to “Add an expression” to assign record count
    value. In the expression builder drag and drop the count element
    that we got as a response from the GETPO API call from the earlier
    step.

    <img src="media/image33.png" style="width:5.39877in;height:3.30996in" />

    Validate and Close the Expression Builder…Save your integration

    Integration so far…

    <img src="media/image34.png" style="width:1.87117in;height:3.36932in" />

2.  Next we will try to build an if-else logic as per below pseudo code

Search for PO record based on POHeaderID (Implemented already in
previous steps)

If (count of PORecords in VBCS) = 1

\- Update existing VBCS PO Record

Else

\- Insert a new PO Record

<img src="media/image35.png" style="width:5.23926in;height:1.77644in" />

Hover on the wiring next to the PORecord Acitivity and Select the
“Switch” Action

<img src="media/image36.png" style="width:2.73006in;height:2.13299in" />

Below construct is created

<img src="media/image37.png" style="width:1.94791in;height:1.51534in" />

**If – Flow (Condition 1)**

Select Condition “1” and click on Edit icon which brings up an
Expression builder and provide the condition as per below

<img src="media/image38.png" style="width:7in;height:2.46667in" />

1.  Hover on the wiring next to the If Condition (1) Action and Click
    on “+” Sign and select the “Assign” Action

    Provide a name for the Assign Action as “AssignVBCSPOId”

    Create a Variable “VBCSPOId” of String data type and add an
    expression as below. Validate and Close the expression builder.

    <img src="media/image39.png" style="width:7in;height:2.85972in" />

    <img src="media/image40.png" style="width:7in;height:1.84722in" />

    Validate and Close the Assign window. Save your integration.

2.  Hover on the wiring next to the Assign Action and Click on “+”
    Sign and select the REST Connection created earlier ex:
    VBCS\_REST\_CON\_\<ClassId\>\_\<StudentId\>

    <img src="media/image41.png" style="width:6.22699in;height:2.3623in" />

3.  In the Basic Info Page provide the details as per below and Click
    Next

<img src="media/image42.png" style="width:7in;height:4.81389in" />

1.  Nothing to Specify in Review Parameters page. Click Next

    <img src="media/image43.png" style="width:5.55215in;height:3.04707in" />

2.  In the Request Page Select the request payload format as “JSON
    Sample”. Select the “inline” link and provide the below Sample JSON
    request and Click Next

    <img src="media/image44.png" style="width:4.77301in;height:3.18532in" />

    ```
   
    {

        "orderNumber": "163521",
        "procurementBUId": "300000046987012",
        "procurementBusinessUnit": "US1 Business Unit",
        "supplierId": "300000047414679",
        "supplier": "Dell.",
        "soldToLegalEntity": "US1 Legal Entity",
        "lOCId": 2

    }

    ```

3.  In the Response page Select the request payload format as “JSON
    Sample”. Select the “inline” link and provide the below Sample JSON
    Response and Click Next

    ```
    
    {

        "id": 24,
        "creationDate": "2019-01-13T23:12:09+00:00",
        "lastUpdateDate": "2019-01-22T16:46:08+00:00",
        "createdBy": "john.doe@example.com",
        "lastUpdatedBy": "john.doe@example.com",
        "pOHeaderId": "300000074157561",
        "orderNumber": "163521",
        "procurementBUId": "300000046987012",
        "procurementBusinessUnit": "US1 Business Unit",
        "supplierId": "300000047414679",
        "supplier": "Dell.",
        "soldToLegalEntity": "300000046973970",
        "lOCId": null,
        "links": \[
    {

        "rel": "self",
        "href":
        "https://oic\_host/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/24",
        "name": "PO",
        "kind": "item",
        "properties": {
        "changeIndicator":
        "ACED0005737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000001770400000001737200106A6176612E6C616E672E446F75626C6580B3C24A296BFB0402000144000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870400000000000000078"

    }

    },

    {

        "rel": "canonical",
        "href":
        "https://oic\_host/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/24",
        "name": "PO",
        "kind": "item"

    }

    \]

    }

    ```

4.  Review the Summary Page and Click on Done

<img src="media/image45.png" style="width:4.27607in;height:2.83163in" />

1.  A Map Action (Map to UPDATEPO) is created. Select the Map Action
    and Click on Edit Icon and provide mapping as per below screenshots

<!-- -->

1.  Map $VBCSPOId **TO** TemplateParameters-\> ID

    <img src="media/image46.png" style="width:5.97546in;height:2.34572in" />

2.  Map onEvent -\>
    getPurchaseOrderResponse-\>result-\>\<sequence\>-\>Value-\>
    ProcurementBUId

    **TO** request-wrapper -\> procurementBUId

    <img src="media/image47.png" style="width:7in;height:2.8875in" />

3.  4.  5.  Map onEvent -\>
    getPurchaseOrderResponse-\>result-\>\<sequence\>-\>Value-\>
    ProcurementBusinessUnit

    **TO** request-wrapper -\> procurementBusinessUnit

    <img src="media/image48.png" style="width:7in;height:2.87778in" />

6.  Map onEvent -\>
    getPurchaseOrderResponse-\>result-\>\<sequence\>-\>Value-\> Supplier

    **TO** request-wrapper -\> supplier

    <img src="media/image49.png" style="width:7in;height:2.82083in" />

7.  Map onEvent -\>
    getPurchaseOrderResponse-\>result-\>\<sequence\>-\>Value-\>
    SupplierId

    **TO** request-wrapper -\> supplierId

    <img src="media/image50.png" style="width:7in;height:2.85069in" />

8.  Map onEvent -\>
    getPurchaseOrderResponse-\>result-\>\<sequence\>-\>Value-\>
    HeaderFlexfield-\>locId

    **TO** request-wrapper -\> lOCId

    <img src="media/image51.png" style="width:6.01227in;height:2.47052in" />

    Click on Save and Validate. Close the mapper

<!-- -->

1.  Integration flow so far…

    <img src="media/image52.png" style="width:4.77914in;height:3.54358in" />

2.  **Else – Flow**

    Hover on the wiring next to “Otherwise “ Action and Select
    VBCS\_REST\_CON\_\<ClassId\>\_\<StudentId\> connection

    <img src="media/image53.png" style="width:5.7546in;height:3.23982in" />

3.  In Basic Page configure the details as per below

    <img src="media/image54.png" style="width:5.68712in;height:4.069in" />

4.  In the Request Page Select the request payload format as “JSON
    Sample”. Select the “inline” link and provide the below Sample JSON
    request and Click Next

```

{

"pOHeaderId": "300000074157551",
"orderNumber": "163521",
"procurementBUId": "300000046987012",
"procurementBusinessUnit": "US1 Business Unit",
"supplierId": "300000047414679",
"supplier": "Dell Inc.",
"soldToLegalEntity": "US1 Legal Entity"

}

```

1.  In the Response Page Select the response payload format as “JSON
    Sample”. Select the “inline” link and provide the below Sample JSON
    response and Click Next

```

{

    "id": 41,
    "creationDate": "2019-01-22T17:32:24+00:00",
    "lastUpdateDate": "2019-01-22T17:32:24.027+00:00",
    "createdBy": "john.doe@example.com",
    "lastUpdatedBy": "john.doe@example.com",
    "pOHeaderId": "300000074157551",
    "orderNumber": "163521",
    "procurementBUId": "300000046987012",
    "procurementBusinessUnit": "US1 Business Unit",
    "supplierId": "300000047414679",
    "supplier": "Dell Inc.",
    "soldToLegalEntity": "300000046973970",
    "lOCId": null,
    "links": \[

{

    "rel": "self",
    "href":
    "https://oichost/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/41",
    "name": "PO",
    "kind": "item",
    "properties": {
    "changeIndicator":
    "ACED0005737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000001770400000001737200106A6176612E6C616E672E446F75626C6580B3C24A296BFB0402000144000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B02000078703FF000000000000078"

}

},

{

"rel": "canonical",
"href":
"https://oichost/ic/builder/design/LetterOfCreditPortal/1.0/resources/data/PO/41",
"name": "PO",
"kind": "item"

}

\]

}

```

1.  Review the Summary and Click Done

    <img src="media/image55.png" style="width:5.65644in;height:3.22327in" />

2.  A Map Action is created. Provide the mapping for the Map Action
    (Map to CREATEPO) as per the screenshot below

    <img src="media/image56.png" style="width:7in;height:2.425in" />

3.  Final Flow 1 Integration

    <img src="media/image57.png" style="width:5.33742in;height:4.11267in" />

    Save your integration flow.

4.  While you are in the Integration flow page, Select the Hamburger
    icon on the TOP right corner and click on Tracking. Configure
    OrderNumber, POHeaderId and ItemDescription as tracking identifiers
    to identify your instance quickly when we a PO is created in ERP
    Cloud. Click Save on the Tracking page.

    <img src="media/image58.png" style="width:7in;height:2.6375in" />

Activate Integration (Flow1)
----------------------------

1.  On the Integrations page, click on the “*ERP PO EVENT VBCS
    \<ClassId\> \<StudentId\>”* flow using the slider button

<img src="media/image59.png" style="width:7in;height:2.02778in" />

1.  Check the *Oracle Recommends* check box to contribute your mappings
    to the Recommendations engine that then suggests mappings to you and
    other users for similar integrations. Also, check *Enable tracing*
    and *Enable payload* for debugging and troubleshooting (you would
    typically have the tracking and payload options disabled on
    production instances, but we enable them here for this lab).

<img src="media/image60.png" style="width:7in;height:3.2625in" />

1.  The activation should complete in a few seconds typically and show a
    green ribbon at the top.

<img src="media/image61.png" style="width:7in;height:1.52708in" />

Testing the ERP Event Flow Integration (Flow1)
----------------------------------------------

1.  Login into ERP Cloud as casey.brown with the credentials provided

2.  Select Procurement tab and click on Purchase Orders

<img src="media/image62.png" style="width:7in;height:2.66458in" />

1.  Select Tasks tab and Click on Create Order

<img src="media/image63.png" style="width:7in;height:2.99097in" />

1.  Enter Supplier information (Dell Inc.) and leave the rest to
    default. Click on Create

<img src="media/image64.png" style="width:2.45399in;height:2.93023in" />

1.  In the Purchase Order page go to the Order Lines Section and provide
    Item information as below

<img src="media/image65.png" style="width:6.87116in;height:3.36401in" />

Note: For “Description” enter a Unique Value of your choice, which was
provided in the xpath expression earlier when configuring the ERP
adapter PO Event

Ref: <img src="media/image15.png" style="width:7in;height:5.09236in" />

1.  Click on Submit to Create a Purchase Order. Make a note of the Order
    Number

<img src="media/image66.png" style="width:3.77036in;height:1.10403in" />

1.  Click on Tasks tab and Select Manage Order

<img src="media/image67.png" style="width:7in;height:2.84931in" />

1.  Search for the Order Number and wait for the Status field to change
    to “Open”

<img src="media/image68.png" style="width:7in;height:2.39861in" />

1.  Go back to Oracle Integration -\> Monitoring -\> Tracking Page and
    Search for your instance with the Order Number as Tracking
    identifier

<img src="media/image69.png" style="width:7in;height:1.45903in" />

1.  Click on the instance and verify that the Flow is completed
    successfully

<img src="media/image70.png" style="width:7in;height:3.10764in" />

Since it is a new PO record which does not exist in VBCS “Otherwise”
flow path is chosen based on the condition

1.  Navigate to Visual Builder and Click on imported application

2.  Select the Business Objects Tab and click on “PO” object you should
    see a new record is created

<img src="media/image71.png" style="width:7in;height:2.07917in" />

Congratulations, you have now completed Flow1 of the Usecase

<img src="media/image72.png" style="width:4.33742in;height:2.20012in" />

You leveraged rich capabilities of Oracle Integration such as ERP
Adapter Event Subscription Capabilities using and App-driven
(trigger-based) integration, ERP Cloud adapter, Rest adapter, Data
Mapper, Actions such as Invoke and Actvities such as Assign, Map,
If-Otherwise etc, Configuring Business Tracking Identifiers and
monitoring running flows.

You could now leverage this knowledge to design, activate and monitor
several use cases for ERP Real time Synchronization

Creating Connections (Flow2)
----------------------------

The following Connections have been created and configured. You will be
using these connections for creating Integration flow

| Connection Name             | Connection Type |
|-----------------------------|-----------------|
| PO REST Interface Con 96 06 | Rest Adapter    |
| ERP Conn 96 06              | ERP Adapter     |

Creating the PO Proxy Integration (Flow2)
-----------------------------------------

1.  On the Oracle Integration home page, click **Integrations**.

2.  On the Integrations page, click **Create**. The Create Integration -
    Select a Style/Pattern dialog is displayed.

3.  Select **App Driven Orchestration** type of integration. The
    **Create New** Integration dialog is displayed.

4.  Enter the following information:

<table>
<thead>
<tr class="header">
<th>Field Element</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>What do you want to call your integration?</td>
<td><p>ERP PO Proxy &lt;ClassId&gt; &lt;StudentId&gt;</p>
<p>Ex: ERP PO Proxy 96 06</p></td>
</tr>
<tr class="even">
<td>Identifier</td>
<td>Accept the default identifier value. The identifier is the same as the integration name you provided, but in upper case.</td>
</tr>
<tr class="odd">
<td>Version</td>
<td>Accept the default version number of 01.00.0000. Or, if you want to change the version number, enter the version using numbers only in this format: xx.xx.xxxx.</td>
</tr>
<tr class="even">
<td>What does this integration do?</td>
<td>This integration demonstrates the use of Oracle Integration REST adapter and ERP Cloud Adapter to create a REST to SOAP proxy for ERP Cloud webservices</td>
</tr>
<tr class="odd">
<td>Which package does this integration belong to?</td>
<td><em>Leave blank</em></td>
</tr>
</tbody>
</table>

<img src="media/image10.png" style="width:4.44277in;height:4.56442in" />

<img src="media/image73.png" style="width:5.09202in;height:3.42752in" />

Click **Create**. The integration canvas is displayed

1.  Hover over the circle next to Start, and click on the + sign

2.  Select the REST Connection (PO REST Interface Con 96 06) from the
    list which is pre created for you

3.  Enter details as in the screenshot below to define the endpoint in
    the flow

<img src="media/image74.png" style="width:7in;height:2.96458in" />

1.  In the Basic info page provide the endpoint name, uri, HTTP Verb and
    Select options for Request/Response payload. Click Next

<img src="media/image75.png" style="width:5.41104in;height:3.94448in" />

1.  In the Request page Select Request payload format as “JSON Sample”
    and provide the sample JSON below by clicking on the inline link

```

{

    "id": 24,
    "lOCId": 3,
    "orderNumber": "163521",
    "pOHeaderId": "300000074157561",
    "procurementBUId": "300000046987012",
    "procurementBusinessUnit": "US1 Business Unit",
    "soldToLegalEntity": "US1 Legal Entity",
    "supplier": "Dell.",
    "supplierId": "300000047414679"

}

```

1.  In the Response page Select Response payload format as “JSON Sample”
    and provide the sample JSON below by clicking on the inline link

```

{

    "pOHeaderId":"300000074157561",
    "orderNumber":"162180",
    "soldToLegalEntityId":"300000074157561",
    "changeOrderNumber":3,
    "requestStatus":"SUCCESS"

}

```

1.  Review the Summary page and click on Done

<img src="media/image76.png" style="width:5.17178in;height:2.99327in" />

A Request/Response Flow is created. Delete the “Map to POPROXY” Action

<img src="media/image77.png" style="width:7in;height:3.08819in" />

1.  Hover on the wiring next to POPROXY Action and Click on “+” sign
    and add the “ERP Conn 96 06” connection which is pre created

<img src="media/image78.png" style="width:7in;height:2.77431in" />

1.  In the Basic info page provide endpoint name , endpoint description
    and Click Next

<img src="media/image79.png" style="width:5.55828in;height:3.08518in" />

1.  In the Actions Page, Select the Radio Button “Query, Create, Update
    or Delete Information” to consume Purchase Order V2 Service

<img src="media/image80.png" style="width:5.10429in;height:2.81749in" />

1.  In the Operations Page Select Browse By -\> Services and Search for
    Purchase Order.

Select PurchaseOrderService and changePurchaseOrder operation to consume
in our flow.

Note: Select the correct PurchaseOrderService which has
“acknowledgePurchaseOrder” in the list of operations

<img src="media/image81.png" style="width:7in;height:4.93958in" />

Click Next

1.  Review the Summary Page and Click Done

<img src="media/image82.png" style="width:5.99386in;height:2.86968in" />

1.  An invoke action is configured with changePO operation and an
    empty Map (Map to changePO) Action is created

<img src="media/image83.png" style="width:7in;height:3.11667in" />

1.  Edit the Map (Map to changePO) Action and provide below mapping

<img src="media/image84.png" style="width:7in;height:2.98611in" />

Select the element changeOrderEntry -\> ChangeOrderDescription which
opens up an expression window. Enter “Update of LOCId”

<img src="media/image85.png" style="width:7in;height:3.15556in" />

Expand “HeaderFlexField” element and map the following fields from
Source to Target

Map $Id -\> $cusotmerPO

<img src="media/image86.png" style="width:7in;height:3.04722in" />

Map lOCId -\> locId

<img src="media/image87.png" style="width:7in;height:3.03958in" />

Validate and Save your integration

1.  Hover on the wiring next to the changePO invoke activity and Click +
    sign to add a Map Action

<img src="media/image88.png" style="width:7in;height:3.07361in" />

1.  Edit the “Map to POProxy” Action and perform the mapping as per
    below

changePurchaseOrderResponse -\> result-\>POHeaderId **TO**
response-wrapper -\> poHeaderId

changePurchaseOrderResponse -\> result-\>OrderNumber **TO**
response-wrapper -\> orderNumber

changePurchaseOrderResponse -\> result-\>SoldtoLegalEntityId **TO**
response-wrapper -\> soldToLegalEntityId

changePurchaseOrderResponse -\> result-\>ChangeOrderNumber **TO**
response-wrapper -\> changeOrderNumber

changePurchaseOrderResponse -\> result-\>RequestStatus **TO**
response-wrapper -\> requestStatus

<img src="media/image89.png" style="width:7in;height:2.72431in" />

Click on Validate and Close

1.  Your Final integration flow…

<img src="media/image90.png" style="width:7in;height:3.20417in" />

1.  Click on Top right Corner and select Tracking. Add the below
    Business Identifiers for Tracking your instance

<img src="media/image91.png" style="width:7in;height:3.94653in" />

Click on Save.

Activate Integration (Flow2)
----------------------------

1.  On the Integrations page, click on the “*ERP PO Proxy \<ClassId\>
    \<StudentId\>”* flow using the slider button and Activate the
    Integration

<img src="media/image92.png" style="width:7in;height:1.19653in" />

<img src="media/image93.png" style="width:2.84663in;height:2.79325in" />

1.  Click on How to run next to the Activation bar

<img src="media/image94.png" style="width:7in;height:1.69722in" />

Open the metadata url generated in a browser window.

This metadata url provides all the description about your REST Endpoint

<img src="media/image95.png" style="width:7in;height:3.49306in" />

1.  Copy the Swagger url from the Endpoint description. We will use the
    swagger definition in next section to create a service connection in
    VBCS Web application

Invoke ERP Cloud Service from VBCS Web App
------------------------------------------

1.  Select the Visual Builder tab, from the list of applications open
    the **LetterOfCreditPortal\<ClassId\>\<StudentId\> Web application**

2.  On the left hand side select Service Connections tab

> <img src="media/image96.png" style="width:7in;height:2.49097in" />

1.  Click on the “ + Service Connection” to create a new Service
    Connection to invoke on a button click

2.  In the “Create Service Connection” page select “Define by
    Specification”

> <img src="media/image97.png" style="width:5.76074in;height:2.8135in" />

1.  Provide the highlighted information as per the screenshot and Click
    Next

> <img src="media/image98.png" style="width:5.57055in;height:2.70128in" />

1.  In the Select Endpoints page Select the “PO\_PROXY” endpoint and
    click on Create

 <img src="media/image99.png" style="width:5.34356in;height:2.58802in" />

 Connection to the endpoint is created

 <img src="media/image100.png" style="width:7in;height:2.00417in" />

1.  \(1) Click on Web application tab and (2) select the “editpopage” by
    expanding the localapp-\>flows-\>main.

    \(3) Select the “Change Order” button on the web page. (4) On the right
    handside select the Events tab

 <img src="media/image101.png" style="width:6.58282in;height:3.05305in" />

1.  Click on New Event and select “Quick Start: ojAction” to create a
    new Action Chain

 <img src="media/image102.png" style="width:7in;height:3.11389in" />

1.  Provide Id as “ChangeOrderAction”. Drag and drop “Call REST
    Endpoint” action from Actions palette onto to the

    “+ Sign”

<img src="media/image103.png" style="width:7in;height:3.26458in" />

<img src="media/image104.png" style="width:7in;height:3.18194in" />

1.  Click on “Select Endpoint” and Configure the Service Connection
    created earlier.

<img src="media/image105.png" style="width:5.65148in;height:4.89571in" />

Click on Select. The endpoint is now configured to be invoked from the
action chain.

1.  Select “Parameters” -\> body which opens a mapper interface page

<img src="media/image106.png" style="width:7in;height:3.39861in" />

1.  We want to Map the “editpopage” page variables to the endpoint
    interface.

> Map $poRecord(Sources) TO body (Target)

<img src="media/image107.png" style="width:7in;height:3.37778in" />

An expression is generated in the expression window based on the
mapping. poRecord is a page variable which holds the data from the
“editpopage”. Click on Save. You should see the body parameter now
marked as “MAPPED”

1.  From the Action palette Select “Fire Notification” action on to the
    “+” sign next to the “Call Rest Endpoint” activity

<img src="media/image108.png" style="width:7in;height:3.17986in" />

1.  Change the Notification type -\> info and provide a Message in the
    text area

<img src="media/image109.png" style="width:7in;height:3.15486in" />

Running the VBCS Web App
------------------------

1.  Click on Run

<img src="media/image110.png" style="width:7in;height:2.17153in" />

1.  The Web application opens up in a separate browser window. We have
    given a basic web app for you to test the end to end flow

<img src="media/image111.png" style="width:7in;height:1.40486in" />

1.  Click on LC List Page which displays all the Letter of Credits
    Available in a Custom table. Go back to the main page

<img src="media/image112.png" style="width:7in;height:2.07222in" />

1.  Click on PO List Page . All the PO records that was created earlier
    in ERP Cloud was synced into VBCS

<img src="media/image113.png" style="width:7in;height:1.69861in" />

1.  Select PO that you created and Click on “Edit PO”

<img src="media/image114.png" style="width:4.49693in;height:2.56075in" />

1.  In the “Edit PO” page provide “LOCId” information. Leave the rest of
    the parameters intact

> <img src="media/image115.png" style="width:7in;height:2.55903in" />

1.  Click on “Change Order” button. Which invokes your “ERP PO Proxy
    \<ClassId\> \<StudentId\>” Integration flow

2.  You should see an instance is created. Go to Integrations -\>
    Monitoring -\> Tracking

    <img src="media/image116.png" style="width:7in;height:1.86111in" />

3.  Select the Order Number and it confirm that the flow is completed
    and green

<img src="media/image117.png" style="width:7in;height:2.97569in" />

1.  Also, observe a notification created in the “Edit PO Page”.
    Confirming the payload is submitted to the Proxy Integration flow

<img src="media/image118.png" style="width:7in;height:2.55139in" />

1.  In the Integrations -\> Monitoring -\> Tracking page, you can
    observe another instance got created. As, LOCId is got updated in
    ERP Cloud Flow 1 is triggered again.

Note: Purchase Order Event is raised both for Create and Update records

<img src="media/image119.png" style="width:7in;height:1.70278in" />

Open the Instance and we see that “If” path is evaluated to Update the
PO into VBCS

<img src="media/image120.png" style="width:7in;height:2.95764in" />

1.  Now go back to the PO List page. It should now show the “LOCId”
    updated.

<img src="media/image121.png" style="width:7in;height:2.59167in" />

Congratulations, you have now completed Flow 2 and an end-to-end Flow to
capture PO Events and update with cross reference of Letter of Credit
Identifier from VBCS Web app.

<img src="media/image122.png" style="width:5.22086in;height:2.38461in" />
