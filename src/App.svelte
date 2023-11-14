<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import IconButton from "@smui/icon-button";
    import getRandomAnimal from "./scripts/generate";
    import Translator, { type TranslatorResult } from "./scripts/translate";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import Snackbar, { Label as SnackbarLabel } from "@smui/snackbar";
    import LinearProgress from "@smui/linear-progress";
    import Select, { Option } from "@smui/select";
    import Languages from "./scripts/languages";
    import { crop } from "./scripts/utilits";

    let text = "";
    let lang = "English";
    let isNotLoading = true;
    let result: TranslatorResult = {};
    let snackbar: Snackbar;
    let timeout: any = null;
</script>

<div class="input">
    <Select variant="outlined" bind:value={lang} label="Language">
        {#each Object.keys(Languages).sort() as lang}
            <Option value={lang}>{lang}</Option>
        {/each}
    </Select>
    <Textfield
        bind:value={text}
        label="Something"
        variant="outlined"
        style="margin: 1rem"
    >
        <IconButton
            class="material-icons align-self-center"
            on:click={() => (text = getRandomAnimal())}
            slot="trailingIcon">casino</IconButton
        >
    </Textfield>
    <Button
        disabled={text.length < 1}
        on:click={() => {
            isNotLoading = false;
            let t = new Translator(text, lang);
            t.translate().then((res) => {
                isNotLoading = true;
                result = res;
            });
        }}
        variant="raised"
    >
        <Label>Generate</Label>
    </Button>
</div>

<div class="content">
    <DataTable
        table$aria-label="Translations"
        style="width: calc(100% - 2rem);"
    >
        <Head>
            <Row>
                <Cell width="50%">Result</Cell>
                <Cell width="50%">Language</Cell>
            </Row>
        </Head>
        <Body>
            {#each Object.keys(result) as key}
                <Row
                    on:click={() => {
                        if (timeout) clearTimeout(timeout);
                        snackbar.close();
                        snackbar.open();
                        timeout = setTimeout(() => {
                            snackbar.close();
                        }, 2000);
                        navigator.clipboard.writeText(key);
                    }}
                >
                    <Cell width="50%" style="max-width: 50%">{key}</Cell>
                    <Cell width="50%" style="max-width: 50%"
                        >{crop(result[key], 5)}</Cell
                    >
                </Row>
            {/each}
        </Body>
        <LinearProgress
            indeterminate
            bind:closed={isNotLoading}
            aria-label="Data is being loaded..."
            slot="progress"
        />
    </DataTable>
</div>

<Snackbar bind:this={snackbar}>
    <SnackbarLabel>Copied to clipboard</SnackbarLabel>
</Snackbar>

<style>
    :global(body) {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .input {
        width: calc(100% - 4rem);
        margin: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .content {
        margin: 2rem;
        width: calc(100% - 4rem);
        text-wrap: wrap;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(.align-self-center) {
        align-self: center !important;
    }
</style>
