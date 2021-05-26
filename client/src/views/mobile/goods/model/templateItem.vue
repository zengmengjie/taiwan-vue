<template>
    <div>
        <transition-group name="collapse" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave">
            <div v-for="(item, index) in form.option" class="spec_list" :key="index">
                <div class="close_icon" v-if="index != 0 && index == form.option.length-1" v-show="showNumber">
                    <i class="el-icon-circle-cross" @click.prevent="removeSpec(item)"></i>
                </div>
                <checker v-model="form.option[index]" default-item-class="checker-item" selected-item-class="checker-item-selected" radio-required>
                    <div class="spec_class" style="text-align:center">
                        <div class="spec_name" v-if="isSend">
                            <span>{{ $t("message.gifts") }}({{index+1}})：{{ $t("message.specifications") }}</span>
                        </div>
                        <checker-item v-for="(item,key) in gallery" :key="key" :value="item" >
                            <el-card :class="{card_red:form.option[index] == item}">
                                <div class="img_class img_border" :class="{img_border_full:gallery.length == 1}">
                                    <img :src="item.img_url" alt="">
                                    <i></i>
                                </div>
                                <div class="img_name">
                                    <span>{{item.img_desc}}</span>
                                </div>
                            </el-card>
                        </checker-item>
                    </div>
                </checker>
                <div v-for="(spec,k) in specList" :key="k">
                    <checker v-model="form.spec[index][k]" default-item-class="checker-item" selected-item-class="checker-item-selected" radio-required>
                        <div class="spec_class">
                            <div class="spec_name">
                                <span v-if="isSend"> {{ $t("message.gifts") }}({{index+1}})：{{spec.lable}}</span>
                                <span v-else>{{spec.lable}}</span>
                            </div>
                            <checker-item v-for="item in spec.value" :value="item" :key="item">
                                <div class="font_class">
                                    <span>{{item}}</span>
                                    <i></i>
                                </div>
                            </checker-item>
                        </div>
                    </checker>
                </div>

                <div class="number" v-show="showNumber">
                    <input-number :longpress="false" max="10" min="0" v-model="form.option_number[index]"></input-number>
                    <span class="number_font">{{ $t("message.quantity") }}</span>
                </div>
            </div>
        </transition-group>
    </div>
</template>