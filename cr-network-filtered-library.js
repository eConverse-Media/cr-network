var filterText = [];

$(function () {
    $('<div class="dropdown-group"><div class="HtmlContent"></div></div>').insertBefore('.grid');

    $('.library-list').each(function () {
        var self = $(this),
            tags = $(self).find('a.label-search-tag').toArray();
        var title = $(self).find('h3 a'),
            link = $(title).attr('href');


        // handle image 

        $(self).prepend('<div class="img-container"/>');

        var entryImg = !!($(self).find('div[id*="fileListInlineWrapper"] .listIconContainer div[id*="pnlImages"] a img').attr('src')) ? $(self).find('div[id*="fileListInlineWrapper"] .listIconContainer div[id*="pnlImages"] a img') : $(self).find('.libListReptEntByline + div .row.margin-bottom-medium img');

        var entryImgSrc = $(entryImg).attr('src');

        var imgContainer = $(self).find('.img-container');

        if (!!entryImgSrc) {
            $(imgContainer).css('background-image', 'url("' + entryImgSrc + '")');
        } else {
            $(imgContainer).addClass('no-img');
        }

        // handle view link

        var viewLink = '<a href="' + link + '" class="view-link">View</a>';
        
        $(viewLink).insertAfter($(self).find('.listIconContainer + .pull-right'));

        var entryAttachementList = $(self).find('.libListReptEntAttchLble');
        $(entryAttachementList).parent().addClass('attachment-wrap');

        $(self).addClass('iso');

        if (tags.length) {
            for (var i = 0; i < tags.length; i++) {
                var tag = $(tags[i]).attr('data-tag').toLowerCase();
                tag = tag.replace(/[^a-zA-Z0-9\s]+/g, '');
                tag = tag.replace(/\s+/g, '-');
                $(self).addClass(tag);
            }
        }

    });

    makinFilters();

    // handle opening dropdowns
    $('.filter-label').click(function () {
        $($(this).parent()).toggleClass('open');
    });

    // handle closing dropdowns
    $(document).click(function (e) {
        var target = e.target,
            selector;

        // if a dropdown or its contents are clicked, don't close that dropdown
        if ($(target).parents('.filter-button-group').length) {
            var parent = $(target).parents('.filter-button-group'),
                klass = $(parent).attr('class').split(/\s+/)[0];

            selector = '.filter-button-group:not(.' + klass + ')';
            //otherwise close all dropdowns
        } else {
            selector = '.filter-button-group';
        }
        $(selector).removeClass('open');
    });

    $("div[id*='DocumentPanel'] .row > .col-md-12 .Content div[id*='ListViewContent']").isotope({
        itemSelector: '.library-list',
        layout: 'masonry'
    });

    var groupFilterButtons = $('.filter-button-group');

    $(groupFilterButtons).each(function (i) {
        w = window;

        var filterButtonGroupEach = groupFilterButtons[i];

        firstFilterClass = filterButtonGroupEach.className.split(' ')[0];

        w['arr_' + firstFilterClass] = [];
    });

    // Update Filters When Drop down input clicked
    $('.checkbox-filter').click(function () {
        var self = $(this),
            input = $(self).find('input');

        handleCheckboxClick(input);
    });

    function handleCheckboxClick(self) {
        var parent = $(self).parents('.filter-button-group'),
            selectors = $(parent).find('.checkbox-filter input').toArray(),
            parentGroup = $(parent).attr('class').split(/\s+/)[0],
            label = $(parent).find('.filter-label'),
            text = $(self).attr('data-filter').toLowerCase(),
            labelText,
            defaultText = 'Filter by';

        text = text.substring(1, text.length);

        //toggle active class
        $(self).toggleClass('active');
        $(self).parent().toggleClass('is-active');

        //check for show all
        var dataFilter = $(self).attr('data-filter');
        if (!dataFilter && $(self).hasClass('active')) {
            for (var i = 1; i < selectors.length; i++) {
                var checkbox = selectors[i];
                $(checkbox).removeClass('active');
                $(checkbox).parent().removeClass('is-active');
                checkbox.checked = false;
            }
        } else {
            $(selectors[0]).removeClass('active');
            $($(selectors)[0]).parent().removeClass('is-active');
            selectors[0].checked = false;
        }

        // set dropdown label text

        filterButtonGroup = $('.filter-button-group');

        $(filterButtonGroup).each(function (i) {
            var filterButtonFirstElement = filterButtonGroup[i];
            var elementFirstClass = filterButtonFirstElement.className.split(' ')[0];
            var classConversion;

            for (var i = 0; i < filterText.length; i++) {
                var currText = filterText[i],
                    currTextClass = currText.categoryClass;

                if (currTextClass == elementFirstClass) {
                    classConversion = currText.categoryName;
                } else if (currTextClass == text) {
                    text = currText.categoryName;
                }
            }

            switch (parentGroup) {
                case elementFirstClass:
                    if (!dataFilter) {
                        w['arr_' + elementFirstClass] = [];
                    }
                    labelText = w['arr_' + elementFirstClass];
                    defaultText += ' ' + classConversion;
                    break;
            }
        });

        if ($(self).hasClass('active') && !!text && text !== 'all') {
            labelText.push(text);
        } else {
            var index = labelText.indexOf(text);
            if (index !== -1) {
                labelText.splice(index, 1);
            }
        }

        if (labelText.length) {
            labelText = labelText.join(', ');
            $(label).text(labelText);
            $(parent).find('.filter-content').addClass('has-selection');
        } else {
            $(label).text(defaultText);
            $(parent).find('.filter-content').removeClass('has-selection');
        }

        updateFilters();
    }

    $(document).click(function (e) {
        var target = e.target,
            selector;

        if ($(target).parents('.filter-content').length) {
            var parent = $(target).parents('.filter-content'),
                klass = $(parent).parent().attr('class').split(/\s+/)[0];
            selector = '.filter-button-group:not(.' + klass + ') .filter-content';
        } else {
            selector = '.filter-content';
        }
        $(selector).removeClass('open');
    });  
}); 

function updateSelection(val, klass, filters) {
    var checkboxes = $(val).find('.active').toArray(),
        localFilters = [];

    $(checkboxes).each(function () {
        var dataFilter = $(this).attr('data-filter');
        localFilters.push(dataFilter);
    });

    filters[klass] = localFilters;
}

function updateFilters() {
    var groups = $('.filter-button-group').toArray(),
        filters = {};

    $(groups).each(function () {
        var self = $(this),
            klass = $(self).attr('class').split(/\s+/)[0],
            selector = '.' + klass;

        updateSelection(selector, klass, filters);
    });

    var filterVal = concatFilters(filters);

    $('.grid div[id*="ListViewContent"]').isotope({ filter: filterVal });
}

function concatFilters(obj) {
    var allFilters = [];

    for (var prop in obj) {
        var group = obj[prop];
        if (!group.length) {
            continue;
        }

        if (!allFilters.length) {
            allFilters = group.slice(0);
            continue;
        }

        var nextFilterList = [];

        for (var i = 0; i < allFilters.length; i++) {
            for (var j = 0; j < group.length; j++) {
                var item = allFilters[i] + group[j];
                nextFilterList.push(item);
            }
        }

        allFilters = nextFilterList;
    }

    allFilters = allFilters.join(', ');

    return allFilters;
}

function makinFilters() {
    categoryList = [];

    $('.label-search-tag:not([aria-label*="User"])').each(function () {
        var self = $(this);
        categoriesMaster = {};
        var ariaLabels = $(self).attr('aria-label');
        var filterCategory = ariaLabels.indexOf(':');
        var categoryValue = ariaLabels.slice(6, filterCategory);
        var tagValueStart = ariaLabels.indexOf('tag=') + 4;
        var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
        categoriesMaster.categoryType = categoryValue;
        categoriesMaster.tag = tagValue;
        categoryList.push(categoriesMaster);


    });

    categoryList.forEach(function (category) {
        var categoryType = category.categoryType;

        if (categoryType != 'Content Types') {
            var categoryTypeClassConversion = categoryType.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]+/g, '').toLowerCase();
    
    
            var categoryTag = category.tag;
    
            categoryTagClassConversion = categoryTag
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z0-9\-]+/g, '')
                .toLowerCase();
                
            if (
                $('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0
            ) {

                // add filter class + text to array
                var tempObj = {
                    categoryName: categoryType,
                    categoryClass: categoryTypeClassConversion
                }
                filterText.push(tempObj);
                // add new filter group
                $('.dropdown-group .HtmlContent').append(
                    '<div class="' +
                    categoryTypeClassConversion +
                    ' filter-button-group "><span class="filter-label">Filter by ' +
                    category.categoryType +
                    '</span><div class="filter-content"><ul class="multiple-select"></ul></div></div>'
                );
    
            }
    
            if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {
    
                if (
                    $('ul.multiple-select > li.checkbox-filter input[data-filter=".' + categoryTagClassConversion + '"]')
                        .length === 0
                ) {

                    // add text to array
                    var tempObj = {
                        categoryName: categoryTag,
                        categoryClass: categoryTagClassConversion
                    }
                    filterText.push(tempObj);

                    // add to filter group
                    $('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append(
                        '<li class="checkbox-filter"><input type="checkbox" id="' +
                        category.tag +
                        '" data-filter=".' +
                        categoryTagClassConversion +
                        '">' +
                        category.tag +
                        '<span class="checkmark"></span></li>'
                    );
    
                }
            }
            
        }

    
    });

    $('.filter-button-group').wrapAll('<div class="row "/>');
    

    $('.filter-button-group .filter-content .multiple-select').prepend(
        '<li class="checkbox-filter"><input type="checkbox" id="all" data-filter="">Show All<span class="checkmark"></span></li>'
    );

    $('.filter-button-group').each(function () {
        var self = $(this),
            multiselect = $(self).find('.multiple-select'),
            listItems = multiselect.children('li:not(:contains("Show All"))').get();
        listItems.sort(sortAlphaNum);
        $.each(listItems, function (idx, itm) {
            multiselect.append(itm);
        });
    });

    
    function sortAlphaNum(a, b) {

        var aText = $(a).text(),
            bText = $(b).text(),
            regexAlpha = /[a-zA-Z*]/g,
            regexNum = /[0-9*]/g;

        aText = aText.toString();
        aText = aText.toLowerCase();

        bText = bText.toString();
        bText = bText.toLowerCase();

        // remove numbers
        var aTextAlpha = aText.replace(regexNum, ''),
            bTextAlpha = bText.replace(regexNum, '');

        // remove extra words
        var aTextAlphaFirstWord = aTextAlpha.split(' ')[0],
            bTextAlphaFirstWord = bTextAlpha.split(' ')[0];

        // remove letters
        var aTextNum = parseInt(aText.replace(regexAlpha, '')),
            bTextNum = parseInt(bText.replace(regexAlpha, ''));
        
        // alphabetically sorting words
        if (!(aTextAlphaFirstWord === bTextAlphaFirstWord)) {
            return aTextAlpha > bTextAlpha ? 1 : -1;
        } else {
            // sorting alphanumeric values
            return aTextNum > bTextNum ? 1 : -1;
        }
        
      } 
} 