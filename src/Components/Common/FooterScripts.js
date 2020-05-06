import React from 'react'

export const FooterScripts = ( ) => {
    return (
      <>
        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="{{'/assets/js/materialize.min.js?v=' | append: site.github.build_revision | relative_url}}" type="text/javascript"></script>
        <script>
         $(document).ready(function(){
           $('.materialboxed').materialbox();
           $('.modal').modal();
           $('.collapsible').collapsible();
           $('.tooltipped').tooltip();
           $('.sidenav').sidenav();
         });
        </script>
      </>
    )
  }
