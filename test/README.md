`StudentStationPreference.aspx.html` is saved from `http://psd.bits-pilani.ac.in/Student/StudentStationPreference.aspx`

These changes have been made to `StudentStationPreference.aspx.html`

```diff
-<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
+<!DOCTYPE html>
```

```diff
    <script src="./StudentStationPreference.aspx_files/StudentStationPref.js" type="text/javascript"></script>
+    <link href="/assets/styles.css" rel="stylesheet" type="text/css">
</head>
```

```diff
    </script>

-
+    <script defer type="module" src="/src/content.ts"></script>

</body></html>
```

```diff
                            <div id="Div1" class="list">
                              
-                                <ul id="sortable_nav" class="item-list divMargin h5 m-t-20 ui-sortable"><li class="col-sm-12 item-blue clearfix ui-state-default"><span cls="1" spn="7048" cname...
+                                <ul id="sortable_nav" class="item-list divMargin h5 m-t-20 ui-sortable">
+                                    <li class="col-sm-12 item-blue clearfix ui-state-default">
+                                        <span cls="1" spn="1001" cname="Manufacturing-Acme Corporation, Toontown" class="spanclass uiicon ui-icon-arrowthick-2-n-s">Manufacturing-Acme Corporation, Toontown</span>
+                                        &nbsp;&nbsp;&nbsp;&nbsp;
+                                        <div class="ui-state-default sortable-number">
+                                            <span id="spnRank" class="">1</span>
+                                        </div>
+                                        <input type="checkbox" chkaccomo="7048" class="accomo pull-right" name="accomoPreference" value="7048">
+                                    </li>
+                                </ul>
                            </div>
```