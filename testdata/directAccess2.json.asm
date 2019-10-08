MBB:0008 
0x00007fafa075cac8:   8b 47 10                         mov    0x10(%rdi),%eax
0x00007fafa075cacb:   3b f0                            cmp    %eax,%esi
0x00007fafa075cacd:   0f 82 08 00 00 00                jb     0x00007fafa075cadb
0x00007fafa075cad3:   48 8b 34 25 02 00 00 00          mov    0x2,%rsi
0x00007fafa075cadb:   8b 44 b7 18                      mov    0x18(%rdi,%rsi,4),%eax
0x00007fafa075cadf:   c3                               retq   
